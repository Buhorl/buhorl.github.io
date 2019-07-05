/******************************/
/*  3.Funciones de ejecución  */
/******************************/

// Función de comienzo de la aventura!
function init(){
	stage = 0;
	var time = 0;
	var text = 'Estás en el interior de una casa abandonada. En frente tuya tienes a una persona con un aspecto siniestro.';
	readStory(text,65);
	time = time+1000+(text.length*65);
	text = '¿Hola, cómo te llamas?';
	setTimeout(
		function(){
		readDialog(0,'???',text);
		},time);
	time = time+1000+(text.length*50);
	setTimeout(
		function(){
			name = prompt("Mi nombre es:");
			readDialog(0,'???',"Hola, "+name+". ¿Qué tal estás? Espero que te apetezca jugar a un juego.");
			$('.butt').delay(2000).queue(function(){
				$('.butt').css("visibility","visible");
				blinkElem('bot1',10,50);$('#bot1').html('Si');
				blinkElem('bot2',10,50);$('#bot2').html('Hmm, ok');
				blinkElem('bot3',10,50);$('#bot3').html('No');
			});
		},time);
}

// Función para el botón en la pos 1
function bot1_f(){
	if (stage==0) {
		alert("Perfecto!");
	}
	else {alert("Warning: Stage"+stage+" for bot1 not found.");}
}

// Función para el botón en la pos 2
function bot2_f(){
	if (stage==0) {
		alert("Perfecto!");
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