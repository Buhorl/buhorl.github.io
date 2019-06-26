/* IDEAS:
https://css-tricks.com/controlling-css-animations-transitions-javascript/

*/

var default_text = "__Lorem__ ~~idem~~ --ipsum-- **laboris** %%dominis%% ##nulla##."
var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
var lots = "Occaecat enim nisi sint aute enim in dolor officia in adipisicing deserunt qui do eiusmod tempor.";
var bit = "Lorem ipsum voluptate tempor tempor.";

var story_inter;
var actual_text;

function blinkElem(id,times,ms){
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

function setStory(text){
	document.getElementById('story').innerHTML = text,1000;
}

// Se rellena el texto que se está leyendo automáticamente (se visualizan efectos) 
// TO DO: Que cuando acabe de leer no lea efectos
function stopText(){
	clearInterval(story_inter);
	setStory(actual_text);
}

// Se lee el texto='text' con un delay='value_ms' entre letras
function readText(text,value_ms){
	if (text === undefined) {text = default_text}
	if (value_ms === undefined) {value_ms = 50;}
	// Se hace clear interval para que no se solape un readText con otro
	clearInterval(story_inter);
	var i = 0;
	actual_text = text;
	//Se realiza cada value_ms ms una actualización del texto que va char a char
	story_inter = setInterval(function() {
		if(i <= text.length - 1){
			i++;
			setStory(text.substr(0,i));
		} else {clearInterval(story_inter);}
	}, value_ms);
}

// Se lee el texto='text' con un delay='value_ms' entre letras y se le aplican efectos (telegram style)
function readTextEffect(text,value_ms){
	if (text === undefined) {text = default_text}
	if (value_ms === undefined) {value_ms = 50;}
	// Se hace clear interval para que no se solape un readText con otro
	clearInterval(story_inter); 
	var current_str = '';
	var delimiter = '';
	var i = 0;
	actual_text = text;
	//Se realiza cada value_ms ms una actualización del texto que va char a char
	//Pero al mismo tiempo se busca para aplicar efectos
	story_inter = setInterval(function() {
		if(i <= text.length - 1){
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
			} else {
				current_str = current_str + text.charAt(i);
			}
			i++;
			setStory(current_str+delimiter);
			initTarget('.target_rainbow','effect_rainbow');
			initTarget('.target_jumpy','effect_jumpy');
			initTarget('.target_pride','effect_pride');
			initTarget('.target_jit','effect_jit');
			rainbow(); jumpy(); pride(); jit();
			//letterEffect('pride',50);
		} else {clearInterval(story_inter);}
	}, value_ms);
}

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