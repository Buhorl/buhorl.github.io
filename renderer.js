/* IDEAS:
https://css-tricks.com/controlling-css-animations-transitions-javascript/
http://acedio.github.io/animalese.js/
*/

//Text strings
var default_text = "__Lorem__ @1lorem@1 ~~idem~~ --ipsum-- **laboris** %%dominis%% ##nulla##."
var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
var lots = "Occaecat enim nisi sint aute enim in dolor officia in adipisicing deserunt qui do eiusmod tempor.";
var bit = "Lorem ipsum voluptate tempor tempor.";

//Variable initialization
var stage;
var name;
var target;
var story_inter;
var story_timer;
var story_funct;
var actual_text;
var curr_dialog = '';

//Other vars
var reward = "https://open.spotify.com/playlist/1ErhO58OeArSOe6Zmrgbv3?si=Ya_ZLLkGTyOySGe-E5YiZw";

// Sounds
// Buzz: http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Electronic/Beeps/Bazzline-Mach_New-7663/Bazzline-Mach_New-7663_hifi.mp3
// Bip : http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Electronic/Beeps/Electron-wwwbeat-8521/Electron-wwwbeat-8521_hifi.mp3
// Beep: http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Electronic/Beeps/Cyberia-Mach_New-7660/Cyberia-Mach_New-7660_hifi.mp3
// Bop : http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Electronic/Beeps/idg-beep-intermed-1550/idg-beep-intermed-1550_hifi.mp3
var sound_1 = new Howl({
  src: ['http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Electronic/Beeps/Electron-wwwbeat-8521/Electron-wwwbeat-8521_hifi.mp3'], 
  volume: 0.2, loop: false,
});
var sound_2 = new Howl({
  src: ['http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Electronic/Beeps/Bazzline-Mach_New-7663/Bazzline-Mach_New-7663_hifi.mp3'], 
  volume: 0.2, loop: false,
});
var sound_3 = new Howl({
  src: ['http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Electronic/Beeps/Cyberia-Mach_New-7660/Cyberia-Mach_New-7660_hifi.mp3'], 
  volume: 0.2, loop: false,
});
var sound_4 = new Howl({
  src: ['http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Electronic/Beeps/idg-beep-intermed-1550/idg-beep-intermed-1550_hifi.mp3'], 
  volume: 0.2, loop: false,
});

var sound_array = [sound_1,sound_2,sound_3,sound_4];
var sound_default = sound_1;

var sineWave = new Pizzicato.Sound({ 
    source: 'wave', options: {type: 'sine', frequency: 450/*, volume: 0.05*/}
}); 
var squareWave = new Pizzicato.Sound({ 
    source: 'wave', options: {type: 'square', frequency: 350/*, volume: 0.05*/}
});
var triangleWave = new Pizzicato.Sound({ 
    source: 'wave', options: {type: 'triangle', frequency: 600/*, volume: 0.05*/}
});
var sawtoothWave = new Pizzicato.Sound({ 
    source: 'wave', options: {type: 'sawtooth', frequency: 480/*, volume: 0.05*/}
});

/* ___ Comienzo del Desarrollo de funciones. Ordenadas según su tipo: ___
	1. Modificaciones de texto
	2. Funciones de Efectos
	3. Funciones de ejecución
*/

/*******************************/
/*  1.Modificaciones de Texto  */
/*******************************/

// ¡Boop!
function boop(){
	console.log("boop");
}

// Cambia el contenido a "text" del elemento Story
function setStory(text){
	document.getElementById('story').innerHTML = text;
}

// Cambia el contenido a "text" del elemento Dialog
function setDialog(text){
	document.getElementById('dialog').innerHTML = text;
}

// Cambia el contenido a "text" del elemento="elem"
function setElem(text,elem){
	document.getElementById(elem).innerHTML = text;
}

// Se rellena el texto que se está renderizando automáticamente (sin visualizar efectos) 
function stopText(){
	clearInterval(story_inter);
	setElem(parseTextEffect(actual_text),target);
	// Se para el último timeout cargado y se re-ejecuta la función que tenía asignada
	setTimeout(
		function(){
			clearTimeout(story_timer);
			window[story_funct]();
		},500);
	initEffects();
}

// Cambia el estado de mute de todos los elementos de sonido del array y para Pizzicato pone el volumen a 0;
function soundState(){
	sound_array.forEach(function(element){
		if(element.volume()!=0){ /*!element.mute()*/
			Pizzicato.volume = 0; //element.mute(true);
			element.volume(0); //$('#muter').css("text-decoration","line-through");
			$('#muter').html('🔈');
		} else {
			Pizzicato.volume = 0.05;
			element.volume(0.2); //element.mute(false);
			$('#muter').html('🔊'); //$('#muter').css("text-decoration","none");
		}
	})
}

// Suena el sonido="sound_id" con una modularidad de sonido de "rand" y "value_ms"
function makeSound(value_ms,rand,sound_id){
	if (value_ms === undefined) {value_ms = 50;}
	if (sound_id === undefined) {sound_id = sound_default;}
	if (rand === undefined) {rand = 11;}
	//var context = new AudioContext();
	//console.log((value_ms/(sound_id.duration()*(90+Math.floor(Math.random()*rand)))));
	switch(sound_id){
        case "sineWave": sineWave.play();	setTimeout(function(){sineWave.stop()},Math.floor(value_ms*0.9)); break;
        case "squareWave": squareWave.play();	setTimeout(function(){squareWave.stop()},Math.floor(value_ms*0.9)); break;
        case "triangleWave": triangleWave.play();	setTimeout(function(){triangleWave.stop()},Math.floor(value_ms*0.9)); break;
        case "sawtoothWave": sawtoothWave.play();	setTimeout(function(){sawtoothWave.stop()},Math.floor(value_ms*0.9)); break;
        default:
		dur = sound_id.duration();
		sound_id.rate(
			100/value_ms//(value_ms/(dur*(90+Math.floor(Math.random()*rand))))
			,sound_id.play()
		);
	};
}

// Renderiza el "text" con una f="value_ms" en el campo de Story
function readStory(text,value_ms){
	target = 'story';
	if (text === undefined) {text = default_text;}
	if (value_ms === undefined) {value_ms = 50;}
	curr_dialog = '';
	setStory(curr_dialog);
	renderTextEffect(text,value_ms,'story');
}

// Renderiza el "text" con una f="value_ms" en el campo de Dialogo poniendo primero el diálogo con color="numb" y el nombre="name"
function readDialog(numb,name,text,value_ms){
	target = 'dialog';
	if (numb === undefined) {numb = '0';}
	if (name === undefined) {name = '???';}
	if (text === undefined) {text = default_text;}
	if (value_ms === undefined) {value_ms = 50;}
	curr_dialog = '<span style=\'color: '+getDialogColor(numb.toString())+'\'>['+parseTextEffect(name)+']: </span>';
	setDialog(curr_dialog);
	setTimeout(
		function(){
			renderTextEffect(text,value_ms,'dialog',getNameSound(name));
		},500);	
}

// Se lee el texto='text' con un delay='value_ms' entre letras y lo renderiza en "elem". El id del sonido será='sound_id' 
function renderText(text,value_ms,elem,sound_id){
	if (text === undefined) {text = default_text}
	if (value_ms === undefined) {value_ms = 50;}
	if (elem === undefined) {elem = 'story';}
	// Se hace clear interval para que no se solape un renderText con otro
	clearInterval(story_inter);
	var i = 0;
	text = removeTextEffect(text);
	actual_text = text;
	//Se realiza cada value_ms ms una actualización del texto que va char a char
	story_inter = setInterval(function() {
		if(i <= text.length - 1){
			i++;
			setElem(text.substr(0,i),elem,);
		} else {clearInterval(story_inter);}
		if(text.charAt(i)!=' '){makeSound(value_ms,100,sound_id);}
	}, value_ms);
}

// Se lee el texto='text' con un delay='value_ms' entre letras y lo renderiza en 'elem' y se le aplican efectos (telegram style). El id del sonido será='sound_id' 
function renderTextEffect(text,value_ms,elem,sound_id){
	if (text === undefined) {text = default_text}
	if (value_ms === undefined) {value_ms = 50;}
	if (elem === undefined) {elem = 'story';}
	// Se hace clear interval para que no se solape un renderText con otro
	clearInterval(story_inter); 
	var current_str = '';
	current_str = curr_dialog;
	var delimiter = '';
	var i = 0;
	actual_text = curr_dialog + text;
	//Se realiza cada value_ms ms una actualización del texto que va char a char
	//Pero al mismo tiempo se busca para aplicar efectos
	story_inter = setInterval(function() {
		if (i <= text.length - 1){
			/* '--' para designar Rainbow */
			if (text.charAt(i)=='-' & text.charAt(i+1)=='-'){
				i++; //Nos saltamos una iter porque sabemos que se marca un efecto
				if (delimiter=='') {
					delimiter = '</span>';
					current_str = current_str + '<span class=\'target_rainbow\'>';
				} else { 
					delimiter = '';
					current_str = current_str + '</span>';
				}
			/* '%%' para designar Jumpy */
			} else if (text.charAt(i)=='%' & text.charAt(i+1)=='%'){
				i++; //Nos saltamos una iter porque sabemos que se marca un efecto
				if (delimiter=='') {
					delimiter = '</span>';
					current_str = current_str + '<span class=\'target_jumpy\'>';
				} else { 
					delimiter = '';
					current_str = current_str + '</span>';
				}
			/* '##' para designar Pride */
			} else if (text.charAt(i)=='#' & text.charAt(i+1)=='#'){
				i++; //Nos saltamos una iter porque sabemos que se marca un efecto
				if (delimiter=='') {
					delimiter = '</span>';
					current_str = current_str + '<span class=\'target_pride\'>';
				} else { 
					delimiter = '';
					current_str = current_str + '</span>';
				}
			/* '~~' para designar Jitter */
			} else if (text.charAt(i)=='~' & text.charAt(i+1)=='~'){
				i++; //Nos saltamos una iter porque sabemos que se marca un efecto
				if (delimiter=='') {
					delimiter = '</span>';
					current_str = current_str + '<span class=\'target_jit\'>';
				} else { 
					delimiter = '';
					current_str = current_str + '</span>';
				}
			/* '**' para designar Bold */
			} else if (text.charAt(i)=='*' & text.charAt(i+1)=='*'){
				i++; //Nos saltamos una iter porque sabemos que se marca un efecto
				if (delimiter=='') {
					delimiter = '</span>';
					current_str = current_str + '<span style=\'font-weight: bold\'>';
				} else { 
					delimiter = '';
					current_str = current_str + '</span>';
				}
			/* '__' para designar Italics */
			} else if (text.charAt(i)=='_' & text.charAt(i+1)=='_'){
				i++; //Nos saltamos una iter porque sabemos que se marca un efecto
				if (delimiter=='') {
					delimiter = '</span>';
					current_str = current_str + '<span style=\'font-style: italic\'>';
				} else { 
					delimiter = '';
					current_str = current_str + '</span>';
				}
			/* '@num' para designar Color */
			} else if (text.charAt(i)=='@' & $.isNumeric(text.charAt(i+1))){
				i++; //Nos saltamos una iter porque sabemos que se marca un efecto
				if (delimiter=='') {
					col = getDialogColor(text.charAt(i));
					delimiter = '</span>'; //delimiter + '</span>';
					current_str = current_str + '<span style=\'color: '+col+'\'>';
				} else { 
					delimiter = '';//delimiter.substr(0,delimiter.length-7); //borrado de '</spam>'
					current_str = current_str + '</span>';
				}
			} else {
				current_str = current_str + text.charAt(i);
				if(text.charAt(i)!=' '){makeSound(value_ms,100,sound_id);}
			}
			setElem(current_str+delimiter,elem);
			if (i == text.length -1 ) {
				initTarget('.target_rainbow','effect_rainbow');
				initTarget('.target_jumpy','effect_jumpy');
				initTarget('.target_pride','effect_pride');
				initTarget('.target_jit','effect_jit');
				rainbow(); jumpy(); pride(); jit();
			}
			i++;	
		} else {clearInterval(story_inter);}
	}, value_ms);
}

// Se lee el texto='text' y se parsean los efectos para que aparezcan en el texto
function parseTextEffect(text){
	if (text === undefined) {text = default_text}
	var current_str = '';
	var i = 0;
	var delimiter = '';
	//Nos recorremos el texto para aplicar los efectos visuales
	while (i <= text.length - 1){
		/* '--' para designar Rainbow */
		if (text.charAt(i)=='-' & text.charAt(i+1)=='-'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
			if (delimiter=='') {
				delimiter = '</span>';
				current_str = current_str + '<span class=\'target_rainbow\'>';
			} else { 
				delimiter = '';
				current_str = current_str + '</span>';
			}
		/* '%%' para designar Jumpy */
		} else if (text.charAt(i)=='%' & text.charAt(i+1)=='%'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
			if (delimiter=='') {
				delimiter = '</span>';
				current_str = current_str + '<span class=\'target_jumpy\'>';
			} else { 
				delimiter = '';
				current_str = current_str + '</span>';
			}
		/* '##' para designar Pride */
		} else if (text.charAt(i)=='#' & text.charAt(i+1)=='#'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
			if (delimiter=='') {
				delimiter = '</span>';
				current_str = current_str + '<span class=\'target_pride\'>';
			} else { 
				delimiter = '';
				current_str = current_str + '</span>';
			}
		/* '~~' para designar Jitter */
		} else if (text.charAt(i)=='~' & text.charAt(i+1)=='~'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
			if (delimiter=='') {
				delimiter = '</span>';
				current_str = current_str + '<span class=\'target_jit\'>';
			} else { 
				delimiter = '';
				current_str = current_str + '</span>';
			}
		/* '**' para designar Bold */
		} else if (text.charAt(i)=='*' & text.charAt(i+1)=='*'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
			if (delimiter=='') {
				delimiter = '</span>';
				current_str = current_str + '<span style=\'font-weight: bold\'>';
			} else { 
				delimiter = '';
				current_str = current_str + '</span>';
			}
		/* '__' para designar Italics */
		} else if (text.charAt(i)=='_' & text.charAt(i+1)=='_'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
			if (delimiter=='') {
				delimiter = '</span>';
				current_str = current_str + '<span style=\'font-style: italic\'>';
			} else { 
				delimiter = '';
				current_str = current_str + '</span>';
			}
		/* '@num' para designar Color */
		} else if (text.charAt(i)=='@' & $.isNumeric(text.charAt(i+1))){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
			if (delimiter=='') {
				col = getDialogColor(text.charAt(i));
				delimiter = '</span>'; //delimiter + '</span>';
				current_str = current_str + '<span style=\'color: '+col+'\'>';
			} else { 
				delimiter = '';//delimiter.substr(0,delimiter.length-7); //borrado de '</spam>'
				current_str = current_str + '</span>';
			}
		} else {
			current_str = current_str + text.charAt(i);
		}
		i++;
	};
	return current_str;
}

// Se lee el texto='text' y se le borran efectos para que solo salga el texto
function removeTextEffect(text){
	if (text === undefined) {text = default_text}
	var current_str = '';
	var i = 0;
	//Nos recorremos el texto para quitarle los efectos visuales
	while (i <= text.length - 1){
		/* '--' para designar Rainbow */
		if (text.charAt(i)=='-' & text.charAt(i+1)=='-'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
		/* '%%' para designar Jumpy */
		} else if (text.charAt(i)=='%' & text.charAt(i+1)=='%'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
		/* '##' para designar Pride */
		} else if (text.charAt(i)=='#' & text.charAt(i+1)=='#'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
		/* '~~' para designar Jitter */
		} else if (text.charAt(i)=='~' & text.charAt(i+1)=='~'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
		/* '**' para designar Bold */
		} else if (text.charAt(i)=='*' & text.charAt(i+1)=='*'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
		/* '__' para designar Italics */
		} else if (text.charAt(i)=='_' & text.charAt(i+1)=='_'){
			i++; //Nos saltamos una iter porque sabemos que se marca un efecto
		} else if (text.charAt(i)=='@' & $.isNumeric(text.charAt(i+1))){
			i++;
		} else {
			current_str = current_str + text.charAt(i);
		}
		i++;
	};
	return current_str;
}

/*****************************/
/*  2. Funciones de Efectos  */
/*****************************/

// Función para aplicar la animación='anim_name' a los Doms cuya clase='clase' con un delay='delay'.
function letterEffect(anim_name,delay,clase){
	if (delay === undefined) {delay = 100;}
	if (clase === undefined) {clase = '.letter';}
	if (anim_name === undefined) 
		{alarm('Falta especificar anim'); return;}
	// Se buscan los elementos con la clase especificada
	$(clase).each(function(index){
		if ($(this).hasClass(anim_name)){
			$(this).removeClass(anim_name);
			initTarget(clase,'effect_'+anim_name);
		} else {
			$(this).delay(delay*(index+1)).queue(function(){
				$(this).addClass(anim_name);
			});
		}
	});
	return;
}

// Función para dividir el texto de los Doms con clase='clase' en letras individuales con clase='clase_efecto' 
function initTarget(clase,clase_efecto){
	if (clase === undefined) {clase = '.effect';}
	if (clase_efecto === undefined) {clase_efecto = 'letter';}
	// Wrap every letter in a span
	$(clase).each(function(){
	  	$(this).html($(this).text().replace(/([^\x00-\x80]|[\!\+\&]|\w)/g, "<span class='"+clase_efecto+"'>$&</span>"))
	});
	return;
}

// Activa el efecto rainbow con un delay="n" entre letras.
function rainbow(n){
	if (n === undefined) {n = 30;}
	letterEffect('rainbow',n,'.effect_rainbow');
}

// Activa el efecto jumpy con un delay="n" entre letras.
function jumpy(n){
	if (n === undefined) {n = 30;}
	letterEffect('jumpy',n,'.effect_jumpy');
}

// Activa el efecto pride con un delay="n" entre letras.
function pride(n){
	if (n === undefined) {n = 30;}
	letterEffect('pride',n,'.effect_pride');
}

// Activa el efecto jit con un delay="n" entre letras.
function jit(n){
	if (n === undefined) {n = 0;}
	letterEffect('jit',n,'.effect_jit');
}

// Inicia todos los efectos y los activa (con los valores por defecto)
function initEffects(){
	initTarget('.target_rainbow','effect_rainbow');
	initTarget('.target_jumpy','effect_jumpy');
	initTarget('.target_pride','effect_pride');
	initTarget('.target_jit','effect_jit');
	rainbow(); jumpy(); pride(); jit();
}


// Parpadeo del elemento con id="id" "times"-veces y con un intervalo de "ms" de separación. EL parpadeo se hace usando la visibilidad
function blinkElem(id,times,ms){
	// even to stay, odd to dissappear
	var i = times;
	var j = setInterval(function() {
		if(document.getElementById(id).style.visibility == "hidden"){
			document.getElementById(id).style.visibility = "visible";
		} else {document.getElementById(id).style.visibility = "hidden";}
		i--; 
		if (i==0) {clearInterval(j);}
	}, ms);
}

// Parpadeo del elemento con id="id" "times"-veces y con un intervalo de "ms" de separación. EL parpadeo se hace alternando entre B y N.
function blinkElemBW(id,times,ms){
	// even to stay, odd to dissappear
	var i = times;
	var j = setInterval(function() {
		if(document.getElementById(id).style.color == "white"){
			document.getElementById(id).style.color = "black";
		} else {document.getElementById(id).style.color = "white";}
		i--; 
		if (i==0) {clearInterval(j);}
	}, ms);
}

/******************************/
/*  3.Funciones de ejecución  */
/******************************/

// Funciones encontradas en el archivo index.js

/*******************************/
/*  4.Funciones de la historia */
/*******************************/

// Función que devuelve uno de los colores disponibles según el 'numb'
function getDialogColor(numb){
	switch (numb) {
		case "0":
		return 'Silver';
		break;
		case "1":
		return 'Crimson';
		break;
		case "2":
		return 'DeepPink';
		break;
		case "3":
		return 'Tomato';
		break;
		case "4":
		return 'Gold';
		break;
		case "5":
		return 'MediumOrchid';
		break;
		case "6":
		return 'SlateBlue';
		break;
		case "7":
		return 'YellowGreen';
		break;
		case "8":
		return 'ForestGreen';
		break;
	}
}

// Funciones RE-definidas en el archivo index.js

function specialName(name){
	return name;
}

function getNameNum(name){
	return 0;
}

function getNameSound(name){
	return 'sound_2';
}

function initR(){
	boop();
	Pizzicato.volume = 0.05;
	var slider = document.getElementById("myRange");
	var output = document.getElementById("demo");
	output.innerHTML = slider.value; // Display the default slider value
	slider.oninput = function() {
		output.innerHTML = this.value;
		sineWave.frequency = this.value;
		squareWave.frequency = this.value;
		triangleWave.frequency = this.value;
		sawtoothWave.frequency = this.value;
	}
}
