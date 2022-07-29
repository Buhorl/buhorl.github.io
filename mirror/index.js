var card_w;
var card_b;
var position = 1;
var turno = 0;
var dir = window.location.pathname.split('/');
var fdir = "";
const max_pos = 6;
const urlParams = new URLSearchParams(window.location.search);

var seed;

// Función para cambiar la ruta
/*
dir = dir.filter(Boolean);
if (dir[dir.length - 1].includes(".html")) {
    dir.pop();
};

while (dir[dir.length - 1] != 'CAH') {
    dir.pop();
    fdir = fdir.concat("../");
}
dir_logo = fdir.concat("logo.png");
document.getElementById('icon').href = fdir.concat('icon.png');
*/

// Función para el botón de Generar Combinación

function bot(){
	if (position == 1){
	 	// set_cards();
		go_right()
		$('*[id=L]').each(function(){$(this).attr("disabled", false)});
		$('*[id=R]').each(function(){$(this).attr("disabled", false)});
	} else if (position == 2) {
		url = "https://www.platanomelon.com/products/mambo-succionador-clitoris-estimulador";
		window.open(url);
	} else if (position == 3) {
		// set_cards($('#lista_n')[0].value,$('#lista_b')[0].value);
		url = "https://www.platanomelon.com/products/vibrador-conejito-recargable-efecto-calor-lucas?variant=30563903766607";
		window.open(url);
	} else if (position == 4) {
		url = "https://www.platanomelon.com/products/simulador-sexo-oral-coco-platanomelon";
		window.open(url);
	} else if (position == 5) {
		url = "https://www.platanomelon.com/products/oh-huevo-vibrador-para-parejas?variant=39670929064015";
		window.open(url);
	} else if (position == 6) {
		url = "https://www.platanomelon.com/products/bala-vibradora-mona-estimulador-clitoris-recargable-discreto";
		window.open(url);
	}
}

// Función para el inicio de ejecución
function init() {
	// change_editions();
	// set_vars();
	// set_list();	
	// set_cards();
	// draw_deck();
}

// Shuffle: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// function shuffle(input_array) {
// 	var array = [...input_array];
// 	var currentIndex = array.length, temporaryValue, randomIndex;

// 	// While there remain elements to shuffle...
// 	while (0 !== currentIndex) {

// 		// Pick a remaining element...
// 		randomIndex = Math.floor(Math.random() * currentIndex);
// 		currentIndex -= 1;

// 		// And swap it with the current element.
// 		temporaryValue = array[currentIndex];
// 		array[currentIndex] = array[randomIndex];
// 		array[randomIndex] = temporaryValue;
// 	}

// 	return array;
// }

// Funcion para inicializar el valor de las variables
// function set_vars() {
// 	seed = urlParams.get('id');
// 	if (!seed || seed.length < 4) {
// 		seed = "";
// 		for (x of Array(6).keys()) {
// 			seed = x % 3 ? seed.concat(String.fromCharCode(65 + Math.floor(Math.random() * 26))) : seed.concat(String.fromCharCode(48 + Math.floor(Math.random() * 10)));
// 			seed = x % 2 ? seed.concat(String.fromCharCode(97 + Math.floor(Math.random() * 26))) : seed.concat(String.fromCharCode(48 + Math.floor(Math.random() * 10)));
// 		}
// 		var rn = Math.floor(Math.random() * 6);
// 		seed = seed.substring(rn, rn + 6);
// 		urlParams.delete("id");
// 		urlParams.append("id", seed);
// 		window.location.search = urlParams.toString(); //Redirecting to new URI
// 	}
// 	Math.seedrandom(seed);
// 	//Preparamos la partida de 0 
// 	turno = 0;
// 	baraja_b = shuffle(entradas_blancas);
// 	baraja_n = shuffle(entradas_negras);
//}

// Función para cambiar las cartas que se muestran en los listados
// function set_list(){
// 	list_w = document.getElementById("lista_b"); 
// 	$('#lista_b').empty();
// 	for (var i = 0; i<entradas_blancas.length; i++){ 
//         list_w.options[i] = new Option(entradas_blancas[i][0],i);
//     }
//     list_b = document.getElementById("lista_n");
//     $('#lista_n').empty();
//     for (var j = 0; j<entradas_negras.length; j++){ 
//         list_b.options[j] = new Option(entradas_negras[j][0],j);
//     }
// }

// Función para "moverse" a la izquierda de las opciones
function go_left() {
	//console.log(position + " to " + (position-1));
	if (position==1){
		//disabled, it shouldn't change anything
	} else
	  if (position == 2) { //2nd to first pos
		$('*[id='+(position-1)+']').each(function(){$(this).css("position", "inherit")});
		$('*[id='+(position-1)+']').each(function(){$(this).attr("hidden", false)});
		$('*[id='+(position)+']').each(function(){$(this).css("position", "absolute")});
		$('*[id='+(position)+']').each(function(){$(this).css("top", "9000px")});
		$('*[id='+(position)+']').each(function(){$(this).attr("hidden", true)});
		$('*[id=L]').each(function(){$(this).attr("disabled", true)});
		$('*[id=C]').each(function(){$(this).attr("disabled", true)});
		position -= 1;
	} else /*position==3,4... etc*/ {
		$('*[id='+(position-1)+']').each(function(){$(this).css("position", "inherit")});
		$('*[id='+(position-1)+']').each(function(){$(this).attr("hidden", false)});
		$('*[id='+(position)+']').each(function(){$(this).css("position", "absolute")});
		$('*[id='+(position)+']').each(function(){$(this).css("top", "9000px")});
		$('*[id='+(position)+']').each(function(){$(this).attr("hidden", true)});
		$('*[id=R]').each(function(){$(this).attr("disabled", false)});
		position -= 1;
	}
	position_tracker();
}

// Función para "moverse" a la derecha de las opciones
function go_right() {
	//console.log(position + " to " + (position + 1 ));
	if (position == max_pos) {
		//disabled, it shouldn't change anything
	} else if (position==max_pos-1){ //2nd to last pos
		$('*[id='+(position+1)+']').each(function(){$(this).css("position", "inherit")});
		$('*[id='+(position+1)+']').each(function(){$(this).attr("hidden", false)});
		$('*[id='+(position)+']').each(function(){$(this).css("position", "absolute")});
		$('*[id='+(position)+']').each(function(){$(this).css("top", "9000px")});
		$('*[id='+(position)+']').each(function(){$(this).attr("hidden", true)});
		$('*[id=R]').each(function(){$(this).attr("disabled", true)});
		position += 1;
	} else /*position=1*/ {
		$('*[id='+(position+1)+']').each(function(){$(this).css("position", "inherit")});
		$('*[id='+(position+1)+']').each(function(){$(this).attr("hidden", false)});
		$('*[id='+(position)+']').each(function(){$(this).css("position", "absolute")});
		$('*[id='+(position)+']').each(function(){$(this).css("top", "9000px")});
		$('*[id='+(position)+']').each(function(){$(this).attr("hidden", true)});
		$('*[id=L]').each(function () { $(this).attr("disabled", false) });
		$('*[id=C]').each(function () { $(this).attr("disabled", false) });
		position += 1;
	}
	position_tracker();
}

function position_tracker() {
	$('#C').html(butt_text[position-1])
	switch (position) {
		case 1:
			break;
		case 2:
			//render_cards();
			break;
		case 3:
			break;
		case 4:
			break;
		case 5:
			break;
		case 6:
			break;
		default:
			console.log("Out of position!");
	}
	//TODO
}

// Función que devuelve en array los valores de las ediciones que están marcadas
// function get_editions(){
// 	result = [];
// 	$("input:checkbox:checked").each(function(){
// 	    result.push($(this).val());
// 	});
// 	return result;
// }

// Función para cambiar las ediciones que se usan en el generador de cartas 
// function change_editions(){
// 	if($('input:checkbox:checked').length == 0){
// 		alert('Selecciona al menos una Edición');
// 		$('input:checkbox#E1').prop('checked',true);
// 		return;
// 	}
// 	eds = get_editions();
// 	entradas_blancas = [];
// 	entradas_negras = [];
// 	for (var i = 0; i <= eds.length - 1; i++) {
// 		for (var j = 0; j <= deck_white[eds[i]].length - 1; j++) {
// 			entradas_blancas.push(deck_white[eds[i]][j]);
// 		}
// 		for (var k = 0; k <= deck_black[eds[i]].length - 1; k++) {
// 			entradas_negras.push(deck_black[eds[i]][k]);
// 		}
// 	}
// 	$('#n_blancas').html(entradas_blancas.length);
// 	$('#n_negras').html(entradas_negras.length);
// }

// Función para sacar la carta de posición="n" de la 'pila' de cartas blancas
// function get_white(n){
// 	if (n === undefined) {
// 		m = Math.random()*entradas_blancas.length
// 		return entradas_blancas[Math.floor(Math.random()*entradas_blancas.length)];
// 	} else {
// 		if (n<0 || n>entradas_blancas.length)
// 			{alert("Valor de entrada inválido")}
// 		else return entradas_blancas[n];
// 	}
// }

// Función para sacar la carta de posición="n" de la 'pila' de cartas negras
// function get_black(n){
// 	if (n === undefined) {
// 		m = Math.random()*entradas_negras.length
// 		return entradas_negras[Math.floor(Math.random()*entradas_negras.length)];
// 	} else {
// 		if (n<0 || n>entradas_negras.length)
// 			{alert("Valor de entrada inválido")}
// 		else return entradas_negras[n];
// 	}
// }

// Función para sacar la combinación de carta negra y blanca(s) con posibilidad de elegirlas con "n","m" y "o".
//	Una vez se han elegido, se les hace el wrapper con los elementos necesarios para poder renderizarlas.  
// function generate_combo(n,m,o){
// 	card_b = get_black(n);
// 	//Vemos si la carta tiene 1 o + huecos
// 	if (card_b[2]==2){
// 		card_w = [get_white(m),get_white(o)];
// 		result = ("<div class=\"card black\"><txt>"+card_b[0]+"</txt></div>").replace
// 			(/(([\_]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[0][0]+"</txt></div><div class=\"card black\"><txt>").replace
// 			(/(([\=]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[1][0]+"</txt></div><div class=\"card black\"><txt>");
// 	} else if (card_b[2]==3){
// 		card_w = [get_white(m),get_white(o),get_white()];
// 		result = ("<div class=\"card black\"><txt>"+card_b[0]+"</txt></div>").replace
// 			(/(([\_]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[0][0]+"</txt></div><div class=\"card black\"><txt>").replace
// 			(/(([\=]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[1][0]+"</txt></div><div class=\"card black\"><txt>").replace
// 			(/(([\+]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[2][0]+"</txt></div><div class=\"card black\"><txt>");
// 	} else {
// 		card_w = [get_white(m)];
// 		result = ("<div class=\"card black\"><txt>"+card_b[0]+"</txt></div>").replace
// 			(/(([\_]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[0][0]+"</txt></div><div class=\"card black\"><txt>");
// 	}	
// 	return result;
// }

// Función para generar las cartas negras por separado (para la sim)
// function generate_deck() {
// 	card_b = baraja_n[turno];
// 	//Vemos si la carta tiene 1 o + huecos
// 	if (card_b[2] == 2) {
// 		result = ("<div class=\"card black\"><txt>" + card_b[0] + "</txt></div>").replace
// 			(/(([\_]{3}))/g, "_____").replace
// 			(/(([\=]{3}))/g, "_____");
// 	} else if (card_b[2] == 3) {
// 		result = ("<div class=\"card black\"><txt>" + card_b[0] + "</txt></div>").replace
// 			(/(([\_]{3}))/g, "_____").replace
// 			(/(([\=]{3}))/g, "_____").replace
// 			(/(([\+]{3}))/g, "_____");
// 	} else {
// 		result = ("<div class=\"card black\"><txt>" + card_b[0] + "</txt></div>").replace
// 			(/(([\_]{3}))/g, "_____");
// 	}
// 	turno = turno == baraja_n.length - 1 ? 0 : turno + 1;
// 	return result;
// }

// Función para renderizar las cartas que haya en el elemento con id 'trgt'
// function render_cards(trgt) {
// 	if (trgt === undefined) {
// 		trgt = 'text';
// 	} trgt = '#' + trgt;
// 	//Se mueven las cartas para que estén una encuma de otra 
// 	var sep = 0;
// 	var card_height_px = $('.white').outerHeight() - Number($('.white').css('padding').replace(/[^0-9\.]+/g, "")) * 2;
// 	$(trgt).children('.card').each(function (index) {
// 		$(this).css("top", (sep - (card_height_px * index)) + "px");
// 		$(this).css("z-index", (index));
// 		//Borramos ahora los vacíos.
// 		if ($(this).children('txt').html().length < 1) {
// 			$(this).remove();
// 			sep = sep + card_height_px;
// 		} else {
// 			sep = sep + $(this).children('txt').outerHeight();
// 			//console.log(sep+' - '+$(this).children('txt').html());
// 		}
// 	});
// 		// Se le añaden las florituras
//     $('.card').append('<br><img class="logo" src="'+dir_logo+'">'); //El logo
// 	$('.card').append('<span class="logo">Criso contra la Humanidad</span>'); //El texto
// 	$('.black').append('<txt class="logo" style="color: black">'+card_b[1]+'</txt>'); //El nº de ed negro
// 	$('.white').each(function (index){
// 		$(this).append('<txt class="logo" style="color: black">' + card_w[index][1] + '</txt>'); //Los nº de ed blancos
// 		//TODO: Arreglar el fallo cuando se generan 2 cartas identicas
// 	});
// 	$('txt.logo').each(function (){
// 		if($(this).html()==3){$(this).addClass('rainbow');} //Arcoiris a las del pack LGTB+
// 	});
// }

// Función para renderizar la baraja de cartas que haya en el elemento con id 'trgt'
// function render_deck(trgt) {
// 	if (trgt === undefined) {
// 		trgt = 'text';
// 	} trgt = '#' + trgt;
// 	//Se mueven las cartas para que estén una encuma de otra 
// 	var sep = 0;
// 	var card_height_px = $('.card').height() + 100;
// 	const deck_size = 10;
// 	for (x of Array(deck_size).keys()) {
// 		$(trgt).append("<div class=\"card black\"><txt>" + card_b[0] + "</txt></div>");
// 	}

// 	$(trgt).children('.card').each(function (index) {
// 		$(this).css("top", (sep - (card_height_px * index)) + "px");
// 		$(this).css("z-index", -(index));
// 		$(this).css("opacity", 1 - (index / deck_size))
// 		$(this).css("border", "groove");
// 		$(this).css("border-color", "rgb(78, 78, 78, 0.2)");
// 		//Borramos ahora los vacíos.
// 		if ($(this).children('txt').html().length < 1) {
// 			$(this).remove();
// 			//sep = sep + card_height_px;
// 		} else {
// 			sep = sep; 
// 			//console.log(sep+' - '+$(this).children('txt').html());
// 		}
// 	});

// 	// Se le añaden las florituras
// 	$('.card').append('<br><img class="logo" src="' + dir_logo + '">'); //El logo
// 	$('.card').append('<span class="logo">Criso contra la Humanidad</span>'); //El texto
// 	$('.black').append('<txt class="logo" style="color: black">' + card_b[1] + '</txt>'); //El nº de ed negro
// 	$('txt.logo').each(function () {
// 		if ($(this).html() == 3) { $(this).addClass('rainbow'); } //Arcoiris a las del pack LGTB+
// 	});
// }

// function add_anim(card_id) {
// 	var top = $("#text2").children().position().top;
// 	var left = $("#text2").children().position().left;
// 	//$("tr#4").append($(".black").clone()[1]);
// 	$("tr#4").append($("#text2").children().clone()[0]);
// 	$("tr#4").children(".black").addClass("card_id");
// 	$('.card_id').css("left", left+"px");
// 	$('.card_id').css("top", top+"px");
// 	$('.card_id').css("position", "absolute");
// 	$('.card_id').css("z-index", 10);
// 	$('.card_id').addClass('slide_out_images')
// 	setTimeout(function () {
// 		$('.card_id').remove();
// 	}, 990);
// 	//add the tr
// }

// // Función para llamar al generador y al renderizado todo en uno
// function set_cards(n,m,o){
// 	$('#text').html(generate_combo(n,m,o));
// 	render_cards();
// }

// function draw_deck() {
// 	$('#text2').html(generate_deck());
// 	render_deck("text2");
// }