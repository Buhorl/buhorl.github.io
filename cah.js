var card_w;
var card_b;

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

function render_cards(){
	//Se mueven las cartas para que estén una encuma de otra 
	var sep = 0;
	$('#text').children('.card').each(function (index){
		$(this).css("top",(sep-(350*index))+"px");
		$(this).css("z-index",(index));
		sep = sep + $(this).children('txt').outerHeight();
		console.log(sep+' - '+$(this).children('txt').html());
		//Borramos ahora los vacíos.
		if($(this).children('txt').html().length<1){
			$(this).remove();
		}
	});
	$('.card').append('<br><img class="logo" src="logo.png">');
	$('.card').append('<span class="logo">Criso contra la Humanidad</span>');
	$('.black').append('<txt class="logo" style="color: black">'+card_b[2]+'</txt>');
	$('.white').each(function (index){
		$(this).append('<txt class="logo" style="color: black">'+card_w[index][1]+'</txt>');
	});

	//$('.card').append('<span>Cards Against Humanity</span>');
}

function set_cards(n,m){
	$('#text').html(generate_combo(n,m));
	render_cards();
}

var song = "https://soundcloud.com/cards-against-humanity/a-good-game-of-cards"

/* Sección de las cartas*/
// [Frase, Edición]
var entradas_blancas = [
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
["Rosalía apropiándose del K-pop",1],
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
["Coño vegano",2],
["El típico fachita.",2],
["Correr como Naruto",2],
["Fin",2],
["Ser una básica",2],
["Nunca",2],
];

// [Frase,Edición,Número de blanks]
var entradas_negras = [ 
["He creado una playlist en spotify para follar que se llama: ___",1,1],
["Cual es tu mayor miedo? ___",1,1],
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
["Dios, porqué no escuchaste mis plegarias? ___",1,1],
["Nadie: h- <br> Yo: ___",1,1],
["La conquista mundial será llevada a cabo por ___",1,1],
["Lo último que se ha puesto Rosalía en las uñas: ___",1,1],
["Si me tocase la lotería me compraría ___",2,1],
["Si entrecierras los ojos, ___ se convierte en ===",2,2],
["El oscuro secreto que el Area 51 esconde es ___",2,1],
["Come rico, come sano; come un buen ___",2,1],
["La nueva moda entre los milennials es ___",2,1],
["Los otacos no se duchan porque están ocupados con ___",2,1],
["Hace demasiado calor como para ___",2,1],
["¿Soy ___? Evidentemente",2,1],
["Qué acabará con el capitalismo? ___",2,1],
["El ingrediente secreto de la coca cola es ___",2,1],
];
