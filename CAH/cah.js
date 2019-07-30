var card_w;
var card_b;
var position = 2;

// Función para el botón de Generar Combinación
function bot(){
	if (position == 2){
	 	set_cards();
	} else if (position == 3) {
		set_cards($('#lista_n')[0].value,$('#lista_b')[0].value);
	}
}

// Función para el inicio de ejecución
function init(){
	change_editions();
	set_list();	
	set_cards();
}

// Función para cambiar las cartas que se muestran en los listados
function set_list(){
	list_w = document.getElementById("lista_b"); 
	$('#lista_b').empty();
	for (var i = 0; i<entradas_blancas.length; i++){ 
        list_w.options[i] = new Option(entradas_blancas[i][0],i);
    }
    list_b = document.getElementById("lista_n");
    $('#lista_n').empty();
    for (var j = 0; j<entradas_negras.length; j++){ 
        list_b.options[j] = new Option(entradas_negras[j][0],j);
    }
}

// Función para "moverse" a la izquierda de las opciones
function go_left(){
	if (position==1){
		//disabled
	} else if (position==2){
		$('*[id=1]').each(function(){$(this).attr("hidden", false)});
		//$('*[id=2]').each(function(){$(this).attr("hidden", true)});
		$('*[id=2]').each(function(){$(this).css("position", "absolute")});
		$('*[id=2]').each(function(){$(this).css("top", "9000px")});
		$('*[id=L]').each(function(){$(this).attr("disabled", true)});
		$('*[id=C]').each(function(){$(this).attr("disabled", true)});
		position = 1;
	} else /*position==3*/ {
		//$('*[id=2]').each(function(){$(this).attr("hidden", false)});
		//$('*[id=2]').each(function(){$(this).css("display", "inline-block")});
		$('*[id=2]').each(function(){$(this).css("position", "inherit")});
		$('*[id=3]').each(function(){$(this).attr("hidden", true)});
		$('*[id=R]').each(function(){$(this).attr("disabled", false)});
		position = 2;
	}
}

// Función para "moverse" a la derecha de las opciones
function go_right(){
	if (position==1){
		$('*[id=1]').each(function(){$(this).attr("hidden", true)});
		//$('*[id=2]').each(function(){$(this).attr("hidden", false)});
		//$('*[id=2]').each(function(){$(this).css("display", "inline-block")});
		$('*[id=2]').each(function(){$(this).css("position", "inherit")});
		$('*[id=L]').each(function(){$(this).attr("disabled", false)});
		$('*[id=C]').each(function(){$(this).attr("disabled", false)});
		position = 2;
	} else if (position==2){
		//$('*[id=2]').each(function(){$(this).attr("hidden", true)});
		//$('*[id=2]').each(function(){$(this).css("display", "none")});
		$('*[id=2]').each(function(){$(this).css("position", "absolute")});
		$('*[id=2]').each(function(){$(this).css("top", "9000px")});
		$('*[id=3]').each(function(){$(this).attr("hidden", false)});
		$('*[id=R]').each(function(){$(this).attr("disabled", true)});
		position = 3;
	} else /*position==3*/ {
		//disabled
	}
}

// Función que devuelve en array los valores de las ediciones que están marcadas
function get_editions(){
	result = [];
	$("input:checkbox:checked").each(function(){
	    result.push($(this).val());
	});
	return result;
}

// Función para cambiar las ediciones que se usan en el generador de cartas 
function change_editions(){
	if($('input:checkbox:checked').length == 0){
		alert('Selecciona al menos una Edición');
		$('input:checkbox#E1').prop('checked',true);
		return;
	}
	eds = get_editions();
	entradas_blancas = [];
	entradas_negras = [];
	for (var i = 0; i <= eds.length - 1; i++) {
		for (var j = 0; j <= deck_white[eds[i]].length - 1; j++) {
			entradas_blancas.push(deck_white[eds[i]][j]);
		}
		for (var k = 0; k <= deck_black[eds[i]].length - 1; k++) {
			entradas_negras.push(deck_black[eds[i]][k]);
		}
	}
	$('#n_blancas').html(entradas_blancas.length);
	$('#n_negras').html(entradas_negras.length);
}

// Función para sacar la carta de posición="n" de la 'pila' de cartas blancas
function get_white(n){
	if (n === undefined) {
		m = Math.random()*entradas_blancas.length
		return entradas_blancas[Math.floor(Math.random()*entradas_blancas.length)];
	} else {
		if (n<0 || n>entradas_blancas.length)
			{alert("Valor de entrada inválido")}
		else return entradas_blancas[n];
	}
}

// Función para sacar la carta de posición="n" de la 'pila' de cartas negras
function get_black(n){
	if (n === undefined) {
		m = Math.random()*entradas_negras.length
		return entradas_negras[Math.floor(Math.random()*entradas_negras.length)];
	} else {
		if (n<0 || n>entradas_negras.length)
			{alert("Valor de entrada inválido")}
		else return entradas_negras[n];
	}
}

// Función para sacar la combinación de carta negra y blanca(s) con posibilidad de elegirlas con "n","m" y "o".
//	Una vez se han elegido, se les hace el wrapper con los elementos necesarios para poder renderizarlas.  
function generate_combo(n,m,o){
	card_b = get_black(n);
	//Vemos si la carta tiene 1 o + huecos
	if (card_b[2]>1){
		card_w = [get_white(m),get_white(o)];
		result = ("<div class=\"card black\"><txt>"+card_b[0]+"</txt></div>").replace
			(/(([\_]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[0][0]+"</txt></div><br><div class=\"card black\"><txt>").replace
			(/(([\=]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[1][0]+"</txt></div><br><div class=\"card black\"><txt>");
	} else {
		card_w = [get_white(m)];
		result = ("<div class=\"card black\"><txt>"+card_b[0]+"</txt></div>").replace
			(/(([\_]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[0][0]+"</txt></div><br><div class=\"card black\"><txt>");
	}	
	return result;
}

// Función para renderizar las cartas que haya en el elemento con id = 'text'
function render_cards(){
	//Se mueven las cartas para que estén una encuma de otra 
	var sep = 0;
	$('#text').children('.card').each(function (index){
		$(this).css("top",(sep-(350*index))+"px");
		$(this).css("z-index",(index));
		//Borramos ahora los vacíos.
		if($(this).children('txt').html().length<1){
			$(this).remove();
		} else {
			sep = sep + $(this).children('txt').outerHeight();
			console.log(sep+' - '+$(this).children('txt').html());
		}
	});
	// Se le añaden las florituras
	$('.card').append('<br><img class="logo" src="logo.png">');
	$('.card').append('<span class="logo">Criso contra la Humanidad</span>');
	$('.black').append('<txt class="logo" style="color: black">'+card_b[2]+'</txt>');
	$('.white').each(function (index){
		$(this).append('<txt class="logo" style="color: black">'+card_w[index][1]+'</txt>');
	});
}

// Función para llamar al generador y al renderizado todo en uno
function set_cards(n,m,o){
	$('#text').html(generate_combo(n,m,o));
	render_cards();
}

// Canción de CAH ;)
var song = "https://soundcloud.com/cards-against-humanity/a-good-game-of-cards"

/* Sección de las cartas*/

// [Frase, Edición]
var deck_white = [
[ /* 1er elem - Edición 1*/
	["No reconocerias la dignidad aunque la tuvieses delante",1],
	["Tambien disponible en negro",1],
	["2",1],
	["30 cm de puro acero Toledano",1],
	["Albert rivera sin tabique",1],
	["Carlos Sobera incitandote a apostar",1],
	["Coprofagia",1],
	["Daddy Yankee",1],
	["El aniversario de la muerte de John Lennon",1],
	["El chikilicuatre",1],
	["El patriarcado",1],
	["El pelo de nicolas cage",1],
	["El pollón",1],
	["El retorno de Peter la anguila",1],
	["El rey matando a su hermano de un disparo",1],
	["Enseñame toda la cacha que soy facha: una pelicula de Bertin Osborne",1],
	["Era un domingo en la tarde fui a los coches de choque",1],
	["Fisting",1],
	["Ganar un concurso para que Ibai te castee un polvo en directo",1],
	["Golpe de remo",1],
	["Hacer un mortadelo.",1],
	["José Luis Bretón vestido de Charmander",1],
	["Kim Jong-un",1],
	["La dick ta dura ",1],
	["La esperada vuelta de Santa Justa Clan",1],
	["La falange",1],
	["La pildora anticonceptiva",1],
	["La Smith y Weason de Santiago Abascal como cura contra la homosexualidad",1],
	["Marta del Castillo",1],
	["Nadie puede sair del valle de los caidos",1],
	["Perder la virginidad con una cancion del fari de fondo.",1],
	["Porque si pegas a un nazi te rebajas a su nivel",1],
	["Quedarse atrapado en una escape room",1],
	["Ricardo Milos en su versión más erótica",1],
	["Satisfyer plus XL black edition",1],
	["Shurpremoh de Rivera.",1],
	["Tu puta madre",1],
	["Tu tía Francisca, la del pueblo",1],
	["Un McDonald’s en la frontera entre Israel y palestina",1],
	["Un remake de GOT con Pipo como señor de la noche",1],
	["Un resbalón tonto en la ducha con el cura de tu pueblo",1],
	["Un simulacro de incendios en un colegio de minusválidos",1],
	["Un strip poker con Falete",1],
	["Un tetazo en la cara es lo que te daba yo.",1],
	["Una barbacoa con Josef Fritzl ",1],
	["Una patada voladora a Echenique",1],
	["Una peli porno de teletubies protagonizada por Carmen de Mairena y Paquirrin",1],
	["“La manada” justo detrás de ti",1],
	["Un buen bukkake",1],
	["La santa inquisición.",1],
	["Bertin Osbourne",1],
	["Profanar la tumba, al ritmo de la rumba",1],
	["A big bad wolf.",1],
	["El hijo de Inés Arrimadas saliendo del armario",1],
	["La heroína de Rivera",1],
	["Un millenial independizándose a los 75",1],
	["Andy y Lucas",1],
	["La riojita",1],
	["A partir de las 9 no vayas al santolio que te da una miaja de apechusque y la roscas.",1],
	["¡Liando Porros!",1],
	["Rosalía apropiándose del K-pop",1]
],
[ /* 2do elem - Edición 2 */
	["Cagar truños como puños",2],
	["Estar en tinder",2],
	["Una suscripcion premium en pronhub",2],
	["Un meme de gatitos de 2005",2],
	["Una buena corrida de toros en la cara de los toreros.",2],
	["Jugar al teto tú solo",2],
	["La Gasolina en bucle",2],
	["Isabel Pantoja entrando a prisión",2],
	["Una paliza de Dakota",2],
	["Destruir todas las evidencias",2],
	["Un partido homoerótico de voleibol",2],
	["Un buen coño vegano",2],
	["El típico fachita.",2],
	["Correr como Naruto",2],
	["Fin",2],
	["Ser una básica",2],
	["Nunca",2],
	["A mí que me cuentas yo he venido aquí a follar.",2],
	["Bad Bunny",2],
	["No follar ni con cloroformo",2],
	["Un señor vestido de payaso regalando chucherías",2],
	["Vivimos en una sociedad",2],
	["Escuchame, dos escopetas tengo",2],
	["La Rosalía",2],
	["Lo importante no es ganar, es ganar",2],
	["El sigueinte representante de Eurovisión",2],
	["Sin ser nada de eso yo",2],
	["Rick Astley",2],
	["No sé, yo voté a Kodos",2],
	["Un Frigopié de 2005",2],
],
[ /* 3er elem - Edición LGTB */
	["Dos tíos en un Jacuzzi a dos metros de distancia porque no son Gay",3],
	["Un pansexual enamorado de un alien",3],
],
];

// [Frase,Edición,Número de blanks]
var deck_black = [ 
[ /* 1er elem - Edición 1 */	
	["He creado una playlist en spotify para follar que se llama: ___",1,1],
	["¿Cual es tu mayor miedo? ___",1,1],
	["Disney anuncia su siguiente live action: ___",1,1],
	["Ni machismo ni feminismo: ___",1,1],
	["No hay razón para alarmarse ___ está de camino",1,1],
	["¿Qué causará el armagedón? ___",1,1],
	["Si pudiese tener un superpoder sería ___",1,1],
	["Venderia mi alma al diablo por un puñado de ___",1,1],
	["¿Es un pajaro? ¿Es un avión? No, es ___",1,1],
	["¿Porque no pudiste venir a funeral? ___",1,1],
	["¿Trabajo estable y una casa? Déjate de gilipolleces tu lo que necesitas es ___",1,1],
	["Arturo Pérez-Reverte acaba de publicar su nuevo libro titulado ___",1,1],
	["En una noche que iba muy pedo le enseñé a mis amigos ___",1,1],
	["Malú incorporándose a los Vengadores como ___",1,1],
	["Por fin se ha desvelado quién ha diseñado el logo de la nueva serie de Loki:___",1,1],
	["¿Dios, porqué no escuchaste mis plegarias? ___",1,1],
	["Nadie: h- <br> Yo: ___",1,1],
	["La conquista mundial será llevada a cabo por ___",1,1],
	["Lo último que se ha puesto Rosalía en las uñas: ___",1,1]
],
[ /* 2do elem - Edición 2 */
	["Si me tocase la lotería me compraría ___",2,1],
	["Si entrecierras los ojos, ___ se convierte en ===",2,2],
	["El oscuro secreto que el Area 51 esconde es ___",2,1],
	["Come rico, come sano; come ___",2,1],
	["La nueva moda entre los milennials es ___",2,1],
	["Los otacos no se duchan porque están ocupados con ___",2,1],
	["Hace demasiado calor como para ___",2,1],
	["¿Soy ___? Evidentemente",2,1],
	["¿Qué acabará con el capitalismo? ___",2,1],
	["El ingrediente secreto de la coca cola es ___",2,1],
	["Tú: ___ Yo: ===",2,2],
	["Cuando miro al móvil y sonrío es porque he visto ___",2,1],
	["Pedro Sánchez formará un gobierno de coalición con ___",2,1],
	["Me he quedado embarazada de ___",2,1],
	["Para cuando la economía flaquee, tengo guardado debajo del colchón ___",2,1],
	["La app de Picolo se actualiza para incluir la siguiente prueba: ___",2,1],
	["Me llamo María José me gustan los libros, soy taciturna, vegetariana ___",2,1]
],
[ /* 3er elem - Edición LGTB */
	["Dentro de LGTB+, el + incluye a ___",3,1],
	["En el próximo Orgullo, habrá una carroza patrocinada por ___",3,1],
]
];


