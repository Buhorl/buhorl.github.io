/*******************************/
/*  4.Funciones de la historia */
/*******************************/

function specialName(name){
	return newname;
}

function getNameNum(name){
	return namenum;
}

function getNameSound(name){
	switch (name) {
	case "K":
	return sound_1;
	break;
	case "G":
	return sound_2;
	break;
	case "???":
	return sound_3;
	break;
	}
	//return namesound;
}

/******************************/
/*  3.Funciones de ejecución  */
/******************************/

function init(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').append("<span class=\"overlay\"> Por favor, abre este enlace en un Ordenador </span>");
	} else {
		$('body').append("<span class=\"overlay\"><button onclick=\"start_framework();\"> Haz click aquí para comenzar </button></span>");
		//start_story();
	}
}

// Función para borrar el overlay y lanzar todos los comandos necesarios para que empiece la historia
function start_framework(){
	$('.overlay').remove();
	setTimeout(
		function(){
			start_story();
		},500);
}

// Función de comienzo de la aventura!
function start_story(){
	stage = 0;
	var time = 0;
	blinkElem('story',9,50);
	var text = 'Estás en el interior de una casa abandonada. En frente tuya tienes a una persona con un aspecto siniestro.';
	readStory(text,65);
	time = time+1000+(text.length*65);
	story_funct = "story_stage_1";
	story_timer = setTimeout(story_stage_1,time);
}

function story_stage_1(){
	var text = '¿Hola, cómo te llamas?';
	blinkElem('dialog',9,50);
	readDialog(0,'???',text);
	var time = /*time+*/1000+(text.length*50);
	story_funct = "story_stage_2";
	story_timer = setTimeout(
		story_stage_2,time);
}

function story_stage_2(){
	name = prompt("Mi nombre es:");
	readDialog(0,'???',"Hola, "+name+". ¿Qué tal estás? Espero que te apetezca jugar a un juego.");
	$('.butt').delay(2000).queue(function(){
		$('.butt').css("visibility","visible");
		blinkElem('bots',9,50);
		blinkElem('bot1',10,50);$('#bot1').html('Si');
		blinkElem('bot2',10,50);$('#bot2').html('Hmm, ok');
		blinkElem('bot3',10,50);$('#bot3').html('No');
	});
	story_funct = "boop";
	story_timer = '';
}
// Función para el botón en la pos 1
function bot1_f(){
	if (stage==0) {
		// alert("Perfecto!");
		text = 'Perfecto!';
		readDialog(0,'???',text);
		time = 1000+(text.length*50);
		setTimeout(
			function(){
				$('body').append("<span class=\"overlay\"> Gracias por jugar la demo! :) </span>");
			},time);
	}
	else {alert("Warning: Stage"+stage+" for bot1 not found.");}
}

// Función para el botón en la pos 2
function bot2_f(){
	if (stage==0) {
		// alert("Perfecto!");
		text = 'Muy bien.';
		readDialog(0,'???',text);
		time = 1000+(text.length*50);
		setTimeout(
			function(){
				$('body').append("<span class=\"overlay\"> Gracias por jugar la demo! :) </span>");
			},time);
	}
	else {alert("Warning: Stage"+stage+" for bot2 not found.");}
}

// Función para el botón en la pos 3
function bot3_f(){
	if (stage==0) {
		alert("Vaya... Ok");
		window.close();
	}
	else {alert("Warning: Stage"+stage+" for bot3 not found.");}
}