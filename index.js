/*******************************/
/*  4.Funciones de la historia */
/*******************************/

function specialName(name){
	switch (name) {
		case "Karencita":
		case "Karen":
		case "K":
		return "##"+name+"##";
		break;
		case "Guillermo":
		case "Guille":
		case "G":
		return "%%"+name+"%%";
		break;
		case "Cristina":
		case "Cris":
		return "--"+name+"--";
		break;
		case "???":
		return "__???__";
		break;
		case "!!!":
		case "David":
		case "david":
		return "~~"+name+"~~";
		break;
		default:
		return name;
	}
}

function getNameNum(name){
	switch (name) {
	case "Reid":
	return 2;
	break;
	case "Morgan":
	return 6
	break;
	case "Penelope":
	return 5;
	break;
	case "Aaron":
	return 4;
	break;
	case "Karen":
	case "##Karen##":
	return 3;
	break;
	case "Guille":
	case "%%Guille%%":
	return 7;
	break;
	case "Cristina":
	case "--Cristina--":
	return 1;
	break;
	case "???":
	return 0;
	break;
	default:
	return 8;
	}
	//return namenum;
}

function getNameSound(name){
	switch (name) {
	case "Reid":
	return "sineWave";
	break;
	case "Morgan":
	return "squareWave";
	break;
	case "Penelope":
	return "triangleWave";
	break;
	case "Aaron":
	return "sawtoothWave";
	break;
	case "Karen":
	return sound_2;
	break;
	case "Guille":
	return sound_2;
	break;
	case "Cristina":
	return sound_3;
	break;
	case "???":
	return sound_4;
	break;
	default:
	return sound_1;
	}
	//return namesound;
}

/******************************/
/*  3.Funciones de ejecución  */
/******************************/

function init(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').append("<span class=\"overlay\" style><p> Por favor, abre este enlace en un Ordenador </p>"+
			"<button onclick=\"start_framework();\"> O pasa de mi y abrelo en el movil. Solo soy un botón, no un policía </button>"+
			"<br><a href=\"./renderer.html\"> O haz click aquí para ir al entorno de pruebas </a> </span>");
	} else {
		$('body').append("<span class=\"overlay\">"+
			"<button onclick=\"start_framework();\"> Haz click aquí para comenzar </button>"+
			"<br><a href=\"./renderer.html\"> O aquí para ir al entorno de pruebas </a>"+
			"</span>");
		//start_story();
	} 	
	stage = 0;
	demo = 1;
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
	//stage = 0;
	var time = 0;
	var text = '';
	if (stage == -1){
		$('body').append("<span class=\"overlay\"> Gracias por jugar la demo! :) </span>");
	}
	if (stage == 0){
		time = 0;
		blinkElem('story',9,50);
		text = 'Estás en el interior de una casa abandonada. En frente tuya tienes a una persona con un aspecto un tanto siniestro.';
		readStory(text,65);
		time = time+1500+(text.length*65);
		story_funct = "story_funct_1";
		story_timer = setTimeout(story_funct_1,time);
	} else if (stage == 1){ 
		//$('body').append("<span class=\"overlay\"> Gracias por jugar la demo! :) </span>");
		text = 'Cuando despiertas, estás en la misma casa de antes. Sin embargo, no tiene la misma pinta de estar abandonada'+
		' y ahora parece ser de día. Sientes un ligero dolor en la cabeza y notas unas gotas de sangre seca en la frente.';
		readStory(text,65);
		time = time+1500+(text.length*65);
		story_funct = "story_funct_1";
		story_timer = setTimeout(story_funct_1,time);
	} else {
		alert("Warning: Stage"+stage+" for start_story not found.");
	}
}

function story_funct_1(){
	var time = 0;
	var text = '';
	if (stage == 0){
		text = '¿Hola, cómo te llamas?';
		blinkElem('dialog',9,50);
		readDialog(0,'???',text);
		time = /*time+*/1500+(text.length*50);
		story_funct = "story_funct_2";
		story_timer = setTimeout(story_funct_2,time);
	} else if (stage == 1){ 
		text = 'Ugghhh... ¿Dónde estoy?';
		readDialog(getNameNum(name),name,text,100);
		time = /*time+*/1500+(text.length*100);
		story_funct = "story_funct_2";
		story_timer = setTimeout(story_funct_2,time);
	}
	else {alert("Warning: Stage"+stage+" for start_story not found.");}
}

function story_funct_2(){
	var time = 0;
	var text = '';
	if (stage == 0){
		name = prompt("Mi nombre es:");
		name = specialName(name);
		readDialog(0,'???',"Hola, "+name+". ¿Qué tal estás? Espero que te apetezca jugar a un juego.");
		//$('.butt').delay(2000).queue(function(){
		setTimeout(function(){
			$('.butt').css("visibility","visible");
			blinkElem('bots',9,50);
			blinkElem('bot1',10,50);$('#bot1').html('Si');
			blinkElem('bot2',10,50);$('#bot2').html('Hmm, ok');
			blinkElem('bot3',10,50);$('#bot3').html('No');
		},2000);
		story_funct = "boop";
		story_timer = '';
	} else if (stage == 1){ 
		text = 'Después de echar una mirada rápida a la habitación, encuentras una carpeta en una mesa que hay a un lado, '+
		' una nevera con unos imanes de letras de colores y la única puerta que da al exterior con un candado de combinación.';
		readStory(text,65);
		time = time+(text.length*65);
		setTimeout(function(){
			$('.butt').attr("disabled", false);
			blinkElem('bot1',6,50);$('#bot1').html('Abrir la carpeta');
			blinkElem('bot2',6,50);$('#bot2').html('Inspeccionar la nevera');
			blinkElem('bot3',6,50);$('#bot3').html('Ir a la puerta');
		},4000);
		story_funct = "boop";
		story_timer = '';
	}
	else {alert("Warning: Stage"+stage+" for start_story not found.");}
}

// *** Funciones de Botones *** //

// Función para el botón en la pos 1
function bot1_f(){
	var time = 0;
	var text = '';
	if (stage==0) {
		$('.butt').attr("disabled", true);
		text = 'Perfecto!';
		readDialog(0,'???',text);
		time = 1500+(text.length*50); console.log(time)
		setTimeout(
			function(){
				if(demo==1){$('body').append("<span class=\"overlay\"> Gracias por jugar la demo! :) </span>");} else {
					stage = 1;
					text = "Poco a poco las luces de la habitación se van apagando y sientes como vas perdiendo el conocimiento...";
					readStory(text);
					time = 1500+(text.length*50);
					story_funct = "start_story";
					story_timer = setTimeout(function(){start_story();},time);
				}
			},time);	
	} else if (stage == 1){
		//Abrir la carpeta
	}
	else {alert("Warning: Stage"+stage+" for bot1 not found.");}
}

// Función para el botón en la pos 2
function bot2_f(){
	var time = 0;
	var text = '';
	if (stage==0) {
		$('.butt').attr("disabled", true);
		text = 'No te veo con muchas ganas, pero bueno, allá vamos.';
		readDialog(0,'???',text);
		time = 1500+(text.length*50);
		setTimeout(
			function(){
				if(demo==1){$('body').append("<span class=\"overlay\"> Gracias por jugar la demo! :) </span>");} else {
					stage = 1;
					text = "Poco a poco las luces de la habitación se van apagando y sientes como vas perdiendo el conocimiento...";
					readStory(text);
					time = 1500+(text.length*50);
					story_funct = "start_story";
					story_timer = setTimeout(function(){start_story();},time);
				}
			},time);
	} else if (stage == 1){
		//Abrir la nevera
	}
	else {alert("Warning: Stage"+stage+" for bot2 not found.");}
}

// Función para el botón en la pos 3
function bot3_f(){
	var time = 0;
	var text = '';
	if (stage==0) {
		$('.butt').attr("disabled", true);
		alert("Vaya... Ok");
		window.close();
	} else if (stage == 1){
		//Ir a la puerta
	}
	else {alert("Warning: Stage"+stage+" for bot3 not found.");}
}