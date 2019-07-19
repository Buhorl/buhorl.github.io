/*******************************/
/*  4.Funciones de la historia */
/*******************************/

//Variables de la ejecución.
var name;		//Nombre del aventurero!
var stage;		//Usado para identificar en qué momento de la Historia se encuentran los diálogos
var sub_stage_1 = 0;	//Lo mismo que 'stage' pero con más detalle
var sub_stage_2 = 0;	//Lo mismo que 'stage' pero con más detalle
var sub_stage_3 = 0;	//Lo mismo que 'stage' pero con más detalle

function currentStage(){
	return [stage, sub_stage_1, sub_stage_2, sub_stage_3];
}

function specialName(name){
	switch (name.toUpperCase()) {
		case "KARENCITA":
		case "KAREN":
		case "K":
		return "##"+name+"##";
		break;
		case "GUILLERMO":
		case "GUILLE":
		case "G":
		return "%%"+name+"%%";
		break;
		case "CRISTINA":
		case "CRIS":
		return "--"+name+"--";
		break;
		case "???":
		return "__???__";
		break;
		case "!!!":
		case "DAVID":
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
}

// Función para borrar el overlay y lanzar todos los comandos necesarios para que empiece la historia
function start_framework(){
	stage = 0;
	demo = 0;
	$('.overlay').remove();
	blinkElem('story',9,50);
	setTimeout(
		function(){
			start_story();
		},500);
}

// Función de comienzo de la aventura!
function start_story(){
	var time = 0;
	var text = '';
	if (stage == -1){
		$('body').append("<span class=\"overlay\"> Gracias por jugar la demo! :) </span>");
	}
	// Stage 0 - Intro
	if (stage == 0){
		time = 0;
		text = 'Estás en el interior de una casa abandonada. En frente tuya tienes a una persona con un aspecto un tanto siniestro.';
		readStory(text,65);
		time = time+1500+(text.length*65);
		story_funct = "story_funct_1";
		story_timer = setTimeout(story_funct_1,time);
	// Stage 1 - Casa
	} else if (stage == 1){ 
		//$('body').append("<span class=\"overlay\"> Gracias por jugar la demo! :) </span>");
		text = 'Cuando despiertas, aún estas dentro de la siniestra casa, sin embargo, no tiene el mismo aspecto de estar abandonada'+
		' y parece que es de día. Sientes un ligero dolor en la cabeza y notas unas gotas de sangre seca en la frente.';
		readStory(text,65);
		time = time+1500+(text.length*65);
		story_funct = "story_funct_1";
		story_timer = setTimeout(story_funct_1,time);
	// Stage 2 - XXX
	} else {
		alert("Warning: Stage"+stage+" for start_story not found.");
	}
}

// Función auxiliar 1
function story_funct_1(){
	var time = 0;
	var text = '';
	// Stage 0 - Intro
	if (stage == 0){
		text = '¿Hola, cómo te llamas?';
		blinkElem('dialog',9,50);
		readDialog(0,'???',text);
		time = time+1500+(text.length*50);
		story_funct = "story_funct_2";
		story_timer = setTimeout(story_funct_2,time);
	// Stage 1 - Casa	
	} else if (stage == 1){ 
		text = 'Ugghhh... ¿Dónde estoy?';
		readDialog(getNameNum(name),name,text,100);
		time = time+1500+(text.length*100);
		story_funct = "story_funct_2";
		story_timer = setTimeout(story_funct_2,time);
	} // Stage 2 - XXX
	else {alert("Warning: Stage"+stage+" for start_story not found.");}
}

// Función auxiliar 2
function story_funct_2(){
	var time = 0;
	var text = '';
	// Stage 0 - Intro
	if (stage == 0){
		name = prompt("Mi nombre es:");
		name = specialName(name);
		readDialog(0,'???',"Hola, "+name+". ¿Qué tal estás? Espero que te apetezca jugar a un juego.");
		setTimeout(function(){
			$('.butt').css("visibility","visible");
			blinkElem('bots',9,50);
			blinkElem('bot1',10,50);$('#bot1').html('Si');
			blinkElem('bot2',10,50);$('#bot2').html('Hmm, ok');
			blinkElem('bot3',10,50);$('#bot3').html('No');
		},2000);
		story_funct = "boop";
		story_timer = '';
	// Stage 1 - Casa	
	} else if (stage == 1){ 
		text = 'Tras echar una ojeada rápida a la habitación, descubres a tu izquierda una mesa sobre la que hay una carpeta, '+
		'a la derecha una nevera con imanes de letras de colores y, al lado de esta, una puerta que da al exterior con un candado de combinación.';
		readStory(text,65);
		time = time+(text.length*65);
		setTimeout(function(){
			$('.butt').attr("disabled", false);
			blinkElem('bot1',6,50);$('#bot1').html('Ir a la mesa de la carpeta');
			blinkElem('bot2',6,50);$('#bot2').html('Acercarse a la nevera');
			blinkElem('bot3',6,50);$('#bot3').html('Avanzar hacia la puerta');
		},3000);
		story_funct = "boop";
		story_timer = '';
	}// Stage 2 - XXX
	else {alert("Warning: Stage"+stage+" for start_story not found.");}
}

// ********* Funciones de Botones ********* //

// Función para el botón en la pos 1
function bot1_f(){
	var time = 0;
	var text = '';
	// Stage 0 - Intro
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
	// Stage 1 - Casa
	} else if (stage == 1){
		if (sub_stage_1 == 0){
			// m - Acercarse a la carpeta
			sub_stage_1 = 1;
			$('.butt').attr("disabled", true);
			text = 'Te acercas a la mesita en la que está la carpeta y te das cuenta de que tiene pinta de ser un expediente policial. ';			
			readStory(text,65);
			time = time+(text.length*65)+300;
			text = 'Esto me da mala espina...';
			story_funct = ['readDialog',getNameNum(name),name,text,100];
			story_timer = setTimeout(function(){
				readDialog(getNameNum(name),name,text,100);},time); 
			time = time+(text.length*100);
			setTimeout(function(){
				$('.butt').attr("disabled", false);
				blinkElem('bot1',6,50);$('#bot1').html('Abrir la carpeta');
				blinkElem('bot2',6,50);$('#bot2').html('Levantar la carpeta');
				blinkElem('bot3',6,50);$('#bot3').html('Volver');
			},2000);
		//En la Carpeta
		} else if (sub_stage_1 == 1){	
			// i- Abrir la carpeta
			$('#bot1').attr("disabled", true);
			text = 'Coges la carpeta y la abres con cuidado. Dentro encuentras 5 fichas, y en la primera de ellas se ve escrito "'+name+
			'" y la mayoría del texto tapado con negro, como si fuera un expediente clasificado que se ven en las películas de espías. '+
			'El resto de ficheros son de varias personas, y están separados por cuatro separadores: uno @1Rojo@1, luego uno @7Verde@7, uno @6Azul@6 y finalmente uno @4Amarillo@4.';
			readStory(text,65);
			time = time+(text.length*65)+300;
			text = 'Estas personas no me suenan de nada...'
			story_timer = setTimeout(function(){
				readDialog(getNameNum(name),name,text,80);},time); 
			story_funct = ['readDialog',getNameNum(name),name,text,80]; //['readMore','story','...',200];
		//En la nevera
		} else if (sub_stage_1 == 2){	
			// i- Abrir la nevera
			$('#bot1').attr("disabled", true);
			text = 'Abres la nevera y no encuentras nada más que un par de latas de comida en conserva y un bote de ketchup. '+
			'En la puerta encuentras el típico limón cueroso y media lechuga pocha.';
			readStory(text,65);
			time = time+(text.length*65)+300;
			text = '¡¿Qué tipo de persona guarda latas de comida sin abrir en la nevera?! Seguro que un psicópata...'
			story_timer = setTimeout(function(){
				readDialog(getNameNum(name),name,text,80);},time); 
			story_funct = ['readDialog',getNameNum(name),name,text,80];//'boop';
		//En la Puerta
		} else if (sub_stage_1 == 3){	
			// i- Forzar la puerta
			$('#bot1').attr("disabled", true);
			text = 'Con toda tu fuerza tiras del pomo y... %%¡NO CONSIGUES NADA!%%.';
			readStory(text,65);
			time = time+(text.length*65)+300;
			text = 'Tampoco sé que me esperaba, es una puerta reforzada...'
			story_timer = setTimeout(function(){
				readDialog(getNameNum(name),name,text,80);},time); 
			story_funct = ['readDialog',getNameNum(name),name,text,80];//'boop';
		}
		else {alert("Warning: Sub_stage_1 "+stage+" for bot1 not found.");}
	// Stage 2 - XXX
	}
	else {alert("Warning: Stage"+stage+" for bot1 not found.");}
}

// Función para el botón en la pos 2
function bot2_f(){
	var time = 0;
	var text = '';
	// Stage 0 - Intro
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
	// Stage 1 - Casa
	} else if (stage == 1){
		if (sub_stage_1 == 0){
			// m - Ir a la nevera
			sub_stage_1 = 2;
			$('.butt').attr("disabled", true);
			text = 'Vas a la derecha y te pones de frente a la nevera, que hace unos ruidos un poco raros cada cierto tiempo'
			+' y parece que va a ponerse a andar de todo lo que vibra.';
			readStory(text,65);
			time = time+(text.length*65)+300;
			text = 'Que no haya una cabeza de alguien dentro, que no haya una cabeza de alguien dentro por favooor...';
			story_funct = ['readDialog',getNameNum(name),name,text,80];
			story_timer = setTimeout(function(){
				readDialog(getNameNum(name),name,text,80);},time); 
			time = time+(text.length*80);
			setTimeout(function(){
				$('.butt').attr("disabled", false);
				blinkElem('bot1',6,50);$('#bot1').html('Abrirla');
				blinkElem('bot2',6,50);$('#bot2').html('Inspeccionar la nevera');
				blinkElem('bot3',6,50);$('#bot3').html('Volver');
			},2000);
		} else if (sub_stage_1 == 1){	//En la Carpeta
			// i - Levantar carpeta
			$('#bot2').attr("disabled", true);
			text = 'Vaya, no hay nada debajo. Tampoco sé muy bien porqué me esperaba otra cosa la verdad.';
			readDialog(getNameNum(name),name,text,80);
		} else if (sub_stage_1 == 2){	//En la Nevera
			// i - Insepccionar nevera
			$('#bot2').attr("disabled", true);
			text = 'A parte de los sonidos y vibraciones, sólo ves seis imanes repartidos por la nevera: '+
			'un @46@4, un @12@1, una @2P@2, un @61@6, un @30@3 y un @78@7.';
			readStory(text,65);
			time = time+(text.length*65)+300;
			text = 'Siempre me ha gustado tener imanes en la nevera, pero prefiero los de ciudades que he visitado.'
			story_timer = setTimeout(function(){
				readDialog(getNameNum(name),name,text,80);},time); 
			story_funct = ['readDialog',getNameNum(name),name,text,80];//'boop';
		} else if (sub_stage_1 == 3){	//En la Puerta
			// i - Abrir candado
			$('#bot2').attr("disabled", true);
			text = 'Mirando el candado, ves que es bastante resistente pero de combinación muy simple, solo de 4 números.';
			time = time+(text.length*65)+300;
			readStory(text,65);
			setTimeout(function(){
				code = prompt("Poner el código en el candado:");
				if (code == '2816'){
					readDialog(getNameNum(name),name,'¡Ayy, era ese, %%siiiiiii%%!',80);
					setTimeout(function(){
					$('body').append("<span class=\"overlay\">Felicidades, has conseguido escapar! Pero ese solo era el principio...</span>");
					},2000);
				} else {readDialog(getNameNum(name),name,'Vaya, tendré que volver a intentarlo...'+
					' A ver si encuentro algo por aquí que me ayude a ver cual es el número.',80);}
				$('#bot2').attr("disabled", false);
			},time);
			story_funct = 'boop';
		}
		else {alert("Warning: Sub_stage_1 "+stage+" for bot2 not found.");}
	// Stage 2 - XXX
	}
	else {alert("Warning: Stage"+stage+" for bot2 not found.");}
}

// Función para el botón en la pos 3
function bot3_f(){
	var time = 0;
	var text = '';
	// Stage 0 - Intro
	if (stage==0) {
		$('.butt').attr("disabled", true);
		alert("Vaya... Ok");
		window.close();
	// Stage 1 - Casa
	} else if (stage == 1){
		if (sub_stage_1 == 0){
			// m - Ir a la puerta
			sub_stage_1 = 3;
			$('.butt').attr("disabled", true);
			text = 'Avanzas hacia la puerta que parece esta hecha de acero o algún metar similar y tiene pinta de ser bastante pesada ';			
			readStory(text,65);
			time = time+(text.length*65)+300;
			text = 'A ver si consigo abrirla...';
			story_funct = ['readDialog',getNameNum(name),name,text,100];
			story_timer = setTimeout(function(){
				readDialog(getNameNum(name),name,text,100);},time); 
			time = time+(text.length*100);
			setTimeout(function(){
				$('.butt').attr("disabled", false);
				blinkElem('bot1',6,50);$('#bot1').html('Forzar la puerta');
				blinkElem('bot2',6,50);$('#bot2').html('Abrir el candado');
				blinkElem('bot3',6,50);$('#bot3').html('Volver');
			},2000);
		} else if (sub_stage_1 == 1){	//En la Carpeta
			// R - Volver
			$('#bot3').attr("disabled", true);
			text = 'Ya he visto todo lo que tenía que ver en esa carpeta.';
			readDialog(getNameNum(name),name,text,80);
			time = 2500+(text.length*80);
			sub_stage_1 = 0;
			story_funct = "story_funct_2";
			story_timer = setTimeout(function(){story_funct_2();},time);
		} else if (sub_stage_1 == 2){	//En la Nevera
			// R - Volver
			$('#bot3').attr("disabled", true);
			text = 'Jo, ya podían haber dejado algo rico de comida ahí dentro...';
			readDialog(getNameNum(name),name,text,80);
			time = 2500+(text.length*80);
			sub_stage_1 = 0;
			story_funct = "story_funct_2";
			story_timer = setTimeout(function(){story_funct_2();},time);
		} else if (sub_stage_1 == 3){	//En la Puerta
			// R - Volver
			$('#bot3').attr("disabled", true);
			text = 'Malditas puertas! Siempre en medio cuando uno no las necesita.';
			readDialog(getNameNum(name),name,text,80);
			time = 2500+(text.length*80);
			sub_stage_1 = 0;
			story_funct = "story_funct_2";
			story_timer = setTimeout(function(){story_funct_2();},time);
		}
		else {alert("Warning: Sub_stage_1 "+stage+" for bot3 not found.");}
	// Stage 2 - XXX
	}
	else {alert("Warning: Stage"+stage+" for bot3 not found.");}
}