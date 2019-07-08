/* IDEAS:
https://css-tricks.com/controlling-css-animations-transitions-javascript/
*/

//Text strings
var default_text = "__Lorem__ @1lorem@1 ~~idem~~ --ipsum-- **laboris** %%dominis%% ##nulla##."
var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
var lots = "Occaecat enim nisi sint aute enim in dolor officia in adipisicing deserunt qui do eiusmod tempor.";
var bit = "Lorem ipsum voluptate tempor tempor.";

//Variable initialization
var stage;
var name;
var story_inter;
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
  volume: 0.2,
  loop: false,
});
var sound_2 = new Howl({
  src: ['http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Electronic/Beeps/Bazzline-Mach_New-7663/Bazzline-Mach_New-7663_hifi.mp3'], 
  volume: 0.2,
  loop: false,
});
var sound_3 = new Howl({
  src: ['http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Electronic/Beeps/Cyberia-Mach_New-7660/Cyberia-Mach_New-7660_hifi.mp3'], 
  volume: 0.4,
  loop: false,
});
var sound_4 = new Howl({
  src: ['http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Electronic/Beeps/idg-beep-intermed-1550/idg-beep-intermed-1550_hifi.mp3'], 
  volume: 0.4,
  loop: false,
});
var sound_default = sound_1;

/* ___ Comienzo del Desarrollo de funciones. Ordenadas según su tipo: ___
	1. Modificaciones de texto
	2. Funciones de Efectos
	3. Funciones de ejecución
*/

/*******************************/
/*  1.Modificaciones de Texto  */
/*******************************/

// Cambia el contenido a "text" del elemento Story
function setStory(text){
	document.getElementById('story').innerHTML = text;
}

// Cambia el contenido a "text" del elemento Dialog
function setDialog(text){
	document.getElementById('dialog').innerHTML = text;
}

// Cambia el contenido a "text" del elemento Dialog
function setElem(text,elem){
	document.getElementById(elem).innerHTML = text;
}

// Se rellena el texto que se está leyendo automáticamente (se visualizan efectos) 
function stopText(){
	clearInterval(story_inter);
	setStory(removeTextEffect(actual_text));
}

// Suena el sonido="sound_id" con una modularidad de sonido de "rand" y "value_ms"
function makeSound(value_ms,rand,sound_id){
	if (value_ms === undefined) {value_ms = 50;}
	if (sound_id === undefined) {sound_id = sound_default;}
	if (rand === undefined) {rand = 11;}
	var context = new AudioContext();
	//console.log((value_ms/(sound_id.duration()*(90+Math.floor(Math.random()*rand)))));
	dur = sound_id.duration();
	sound_id.rate(
		100/value_ms//(value_ms/(dur*(90+Math.floor(Math.random()*rand))))
		,sound_id.play()
	);
}

// TODO
function readStory(text,value_ms){
	if (text === undefined) {text = default_text;}
	if (value_ms === undefined) {value_ms = 50;}
	curr_dialog = '';
	setDialog(curr_dialog);
	readTextEffect(text,value_ms,'story');
}

// Función centrada en Crear un entorno de diálogo
function readDialog(numb,name,text,value_ms){
	if (numb === undefined) {numb = '0';}
	if (name === undefined) {name = '???';}
	if (text === undefined) {text = default_text;}
	if (value_ms === undefined) {value_ms = 50;}
	curr_dialog = '<span style=\'color: '+getDialogColor(numb.toString())+'\'>['+name+'] </span>';
	setDialog(curr_dialog);
	setTimeout(
		function(){
			readTextEffect(text,value_ms,'dialog');
		},500);	
}

// Se lee el texto='text' con un delay='value_ms' entre letras
function readText(text,value_ms,elem){
	if (text === undefined) {text = default_text}
	if (value_ms === undefined) {value_ms = 50;}
	if (elem === undefined) {elem = 'story';}
	// Se hace clear interval para que no se solape un readText con otro
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
	}, value_ms);
}

// Se lee el texto='text' con un delay='value_ms' entre letras y se le aplican efectos (telegram style)
function readTextEffect(text,value_ms,elem){
	if (text === undefined) {text = default_text}
	if (value_ms === undefined) {value_ms = 50;}
	if (elem === undefined) {elem = 'story';}
	// Se hace clear interval para que no se solape un readText con otro
	clearInterval(story_inter); 
	var current_str = '';
	current_str = curr_dialog;
	var delimiter = '';
	var i = 0;
	actual_text = text;
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
				if(text.charAt(i)!=' '){makeSound(value_ms,100);}
			}
			setElem(current_str+delimiter,elem);
			initTarget('.target_rainbow','effect_rainbow');
			initTarget('.target_jumpy','effect_jumpy');
			initTarget('.target_pride','effect_pride');
			initTarget('.target_jit','effect_jit');
			rainbow(); jumpy(); pride(); jit();
			i++;	
		} else {clearInterval(story_inter);}
	}, value_ms);
}

// Se lee el texto='text' y se le borran efectos para que solo salga el texto
function removeTextEffect(text){
	if (text === undefined) {text = default_text}
	var current_str = '';
	var i = 0;
	actual_text = text;
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
	if (clase_efecto === undefined) {clase = 'letter';}
	// Wrap every letter in a span
	$(clase).each(function(){
	  	$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='"+clase_efecto+"'>$&</span>"))
	});
	return;
}

function rainbow(){
	letterEffect('rainbow',30,'.effect_rainbow');
}

function jumpy(){
	letterEffect('jumpy',30,'.effect_jumpy');
}

function pride(){
	letterEffect('pride',30,'.effect_pride');
}

function jit(){
	letterEffect('jit',0,'.effect_jit');
}

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
		return 'GreenYellow';
		break;
		case "8":
		return 'SpringGreen';
		break;
	}
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

/*
Old yet somewhat functional.
function jump(){
	$('.letter').each(function(index){
		if ($(this).hasClass('jumpy')){
			$(this).removeClass('jumpy');
		} else {
			$(this).delay(30*(index+1)).queue(function(){
				$(this).addClass('jumpy');
			});
		}
	});
	return;
}

function rainbow(){
	$('.letter').each(function(index){
		$(this).delay(30*index).queue(function(){
			$(this).toggleClass('rainbow');
			//$(this).addClass('jumpy');
			//$(this).addClass('pride');
		});
	});
	return;
}

function pride(){
	$('.letter').each(function(index){
		$(this).delay(30*index).queue(function(){
			$(this).toggleClass('pride');
		});
	});
	return;
}
*/

/*
function rainbow(){
	$('.letter').each($).wait(20,function(index){
		anime({
		  	targets: $(this).get(),
		  	translateY: [
			    { value: 10, duration: 100, delay: 0},
			    { value: 0, duration: 100, delay: 0}
			],
			//translateY:  10,
			direction: 'alternate',
		    easing: 'easeInOutSine',
	  		loop: true,
		});
		$(this).addClass('rainbow');
	});
	return;
}
*/

/*
function rainbow2(){
	$('.letter').each(function(index){
		$(this).delay(30*index).queue(function(){
		anime({
		  	targets: $(this).get(),
		  	translateY: [
				{ value: 10, duration: 100, background: '#FFF'},
			    { value: 0, duration: 100, background: '#000'}
			],
			//translateY:  10,
			direction: 'alternate',
		    easing: 'easeInOutSine',
	  		loop: true,
		});
		//$(this).addClass('rainbow');
		});
	});
	return;
}
*/
/*	anime({
	  	targets: '.letter',
	  	translateY: [
		    { value: 9, duration: 30, delay: function(el, i) {return 30*i;}},
		    { value: 0, duration: 30, delay: function(el, i) {return 30*i;}}
		],
	    easing: 'easeInOutSine',
	  	loop: true,
	  	delay: function(el, i, l) {return i*50;}
	});*/

	/*		anime({
	  	targets: $(this).get(),
	  	translateY: [
		    { value: 9, duration: 1000, delay: function(el, i) {return 300*(index%5);}},
		    { value: 0, duration: 1000, delay: 0}
		],
	    easing: 'easeInOutSine',
	  	loop: true*/