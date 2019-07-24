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

function generate_combo(n,m){
	return ("<div class=\"black\">"+get_black(m)+"</div>").replace
		(/(([\_]{3}))/g, "</div><br><div class=\"white\">"+get_white(n)+"</div><br><div class=\"black\" style=\"z-index: 2\">");
}

function set_cards(n,m){
	$('#text').html(generate_combo(n,m));
	$('#text').children('div').each(function (index){
		$(this).css("top",(-85*(index))+"mm")
		//alert($(this).html())
		if($(this).html().length<1){
			$(this).remove();
		}
	});
}

var song = "https://soundcloud.com/cards-against-humanity/a-good-game-of-cards"

/* Sección de las cartas*/
var entradas_blancas = [
"No reconocerias la dignidad aunque la tuvieses delante",
"tambien disponible en negro",
"2",
"30 cm de puro acero Toledano",
"Albert rivera sin tabique",
"Carlos Sobera incitandote a apostar",
"Coprofagia",
"Daddy Yankee",
"El aniversario de la muerte de John Lennon",
"El chikilicuatre",
"El patriarcado",
"El pelo de nicolas cage",
"El pollón",
"El retorno de Peter la anguila",
"El rey matando a su hermano de un disparo",
"Enseñame toda la cacha que soy facha: una pelicula de Bertin Osborne",
"Era un domingo en la tarde fui a los coches de choque",
"Fisting",
"Ganar un concurso para que Ibai te castee un polvo en directo",
"Golpe de remo",
"Hacer un mortadelo.",
"José Luis Bretón vestido de Charmander",
"Kim Jong-un",
"La dick ta dura ",
"La esperada vuelta de Santa Justa Clan",
"La falange",
"La pildora anticonceptiva",
"La Smith y Weason de Santiago Abascal como cura contra la homosexualidad",
"Marta del Castillo",
"Nadie puede sair del valle de los caidos",
"Perder la virginidad con una cancion del fari de fondo.",
"Porque si pegas a un nazi te rebajas a su nivel",
"Quedarse atrapado en una escape room",
"Ricardo Milos en su versión más erótica",
"Satisfyer plus XL black edition",
"Shurpremoh de Rivera.",
"Tu puta madre",
"Tu tía Francisca, la del pueblo",
"Un McDonald’s en la frontera entre Israel y palestina",
"Un remake de GOT con Pipo como señor de la noche",
"Un resbalón tonto en la ducha con el cura de tu pueblo",
"Un simulacro de incendios en un colegio de minusválidos",
"Un strip poker con Falete",
"Un tetazo en la cara es lo que te daba yo.",
"Una barbacoa con Josef Fritzl ",
"Una patada voladora a Echenique",
"Una peli porno de teletubies protagonizada por Carmen de Mairena y Paquirrin",
"“La manada” justo detrás de ti",
"Un buen bukkake",
"La santa inquisición.",
];
var entradas_negras = [ 
"He creado una playlist en spotify para follar que se llama: ___",
"Cual es tu mayor miedo? ___",
"Disney anuncia su siguiente live action: ___",
"Ni machismo ni feminismo: ___",
"No hay razón para alarmarse ___ Está de camino",
"¿Qué causará el armagedón? ___",
"Si pudiese tener un superpoder sería ___",
"Venderia mi alma al diablo por un puñado de ___",
"¿Es un pajaro? ¿Es un avión? No, es ___",
"¿Porque no pudiste venir a funeral? ___",
"¿Trabajo estable y una casa? Déjate de gilipolleces tu lo que necesitas es ___",
"Arturo Pérez-Reverte acaba de publicar su nuevo libro titulado ___",
];