var card_w;
var card_b;
var position = 2;
var dir = window.location.pathname.split('/');
var fdir = "";

// Función para cambiar la ruta
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
	if (card_b[2]==2){
		card_w = [get_white(m),get_white(o)];
		result = ("<div class=\"card black\"><txt>"+card_b[0]+"</txt></div>").replace
			(/(([\_]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[0][0]+"</txt></div><div class=\"card black\"><txt>").replace
			(/(([\=]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[1][0]+"</txt></div><div class=\"card black\"><txt>");
	} else if (card_b[2]==3){
		card_w = [get_white(m),get_white(o),get_white()];
		result = ("<div class=\"card black\"><txt>"+card_b[0]+"</txt></div>").replace
			(/(([\_]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[0][0]+"</txt></div><div class=\"card black\"><txt>").replace
			(/(([\=]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[1][0]+"</txt></div><div class=\"card black\"><txt>").replace
			(/(([\+]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[2][0]+"</txt></div><div class=\"card black\"><txt>");
	} else {
		card_w = [get_white(m)];
		result = ("<div class=\"card black\"><txt>"+card_b[0]+"</txt></div>").replace
			(/(([\_]{3}))/g, "</txt></div><div class=\"card white\"><txt>"+card_w[0][0]+"</txt></div><div class=\"card black\"><txt>");
	}	
	return result;
}

// Función para renderizar las cartas que haya en el elemento con id = 'text'
function render_cards(){
	//Se mueven las cartas para que estén una encuma de otra 
	var sep = 0;
	var card_height_px = $('.white').outerHeight() - Number($('.white').css('padding').replace(/[^0-9\.]+/g, ""))*2;
	$('#text').children('.card').each(function (index){
		$(this).css("top",(sep-(card_height_px*index))+"px");
		$(this).css("z-index",(index));
		//Borramos ahora los vacíos.
		if($(this).children('txt').html().length<1){
			$(this).remove();
			sep = sep + card_height_px;
		} else {
			sep = sep + $(this).children('txt').outerHeight();
			console.log(sep+' - '+$(this).children('txt').html());
		}
	});
	// Se le añaden las florituras
    $('.card').append('<br><img class="logo" src="'+dir_logo+'">'); //El logo
	$('.card').append('<span class="logo">Criso contra la Humanidad</span>'); //El texto
	$('.black').append('<txt class="logo" style="color: black">'+card_b[2]+'</txt>'); //El nº de ed negro
	$('.white').each(function (index){
		$(this).append('<txt class="logo" style="color: black">'+card_w[index][1]+'</txt>'); //Los nº de ed blancos
	});
	$('txt.logo').each(function (){
		if($(this).html()==3){$(this).addClass('rainbow');} //Arcoiris a las del pack LGTB+
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
	["Deus Vult",2],
],
[ /* 3er elem - Edición LGTB */
	["Dos tíos en un Jacuzzi a dos metros de distancia porque no son Gay",3],
	["Un pansexual enamorado de un alien",3],
	["Heteros™",3],
],
[ /* OG! */
	["Coat hanger abortions",1],
	["Man meat",1],
	["Autocannibalism",1],
	["Vigorous jazz hands",1],
	["Flightless birds",1],
	["Pictures of boobs",1],
	["Doing the right thing",1],
	["Hunting accidents",1],
	["A cartoon camel enjoying the smooth, refreshing taste of a cigarette",1],
	["The violation of our most basic human rights",1],
	["Viagra ®",1],
	["Self-loathing",1],
	["Spectacular abs",1],
	["An honest cop with nothing left to lose",1],
	["Abstinence",1],
	["A balanced breakfast",1],
	["Mountain Dew Code Red",1],
	["Concealing a boner",1],
	["Roofies",1],
	["Glenn Beck convulsively vomiting as a brood of crab spiders hatches in his brain and erupts from his tear ducts",1],
	["Tweeting",1],
	["The Big Bang",1],
	["Amputees",1],
	["Dr. Martin Luther King, Jr.",1],
	["Former President George W. Bush",1],
	["Being marginalized",1],
	["Smegma",1],
	["Laying an egg",1],
	["Cuddling",1],
	["Aaron Burr",1],
	["The Pope",1],
	["A bleached asshole",1],
	["Horse meat",1],
	["Genital piercings",1],
	["Fingering",1],
	["Elderly Japanese men",1],
	["Stranger danger",1],
	["Fear itself",1],
	["Science",1],
	["Praying the gay away",1],
	["Same-sex ice dancing",1],
	["The terrorists",1],
	["Making sex at here",1],
	["German dungeon porn",1],
	["Bingeing and purging",1],
	["Ethnic cleansing",1],
	["Cheating in the Special Olympics",1],
	["Nickelback",1],
	["Heteronormativity",1],
	["William Shatner",1],
	["Making a pouty face",1],
	["Chainsaws for hands",1],
	["The placenta",1],
	["The profoundly handicapped",1],
	["Tom Cruise",1],
	["Object permanence",1],
	["Goblins",1],
	["An icepick lobotomy",1],
	["Arnold Schwarzenegger",1],
	["Hormone injections",1],
	["A falcon with a cap on its head",1],
	["Foreskin",1],
	["Dying",1],
	["Stunt doubles",1],
	["The invisible hand",1],
	["Jew-fros",1],
	["A really cool hat",1],
	["Flash flooding",1],
	["Flavored condoms",1],
	["Dying of dysyntery",1],
	["Sexy pillow fights",1],
	["The Three-Fifths compromise",1],
	["A sad handjob",1],
	["Men",1],
	["Historically black colleges",1],
	["Sean Penn",1],
	["Heartwarming orphans",1],
	["Waterboarding",1],
	["The clitoris",1],
	["Vikings",1],
	["Friends who eat all the snacks",1],
	["The Underground Railroad",1],
	["Pretending to care",1],
	["Raptor attacks",1],
	["A micropenis",1],
	["A Gypsy curse",1],
	["Agriculture",1],
	["Bling",1],
	["A clandestine butt scratch",1],
	["The South",1],
	["Sniffing glue",1],
	["Consultants",1],
	["My humps",1],
	["Geese",1],
	["Being a dick to children",1],
	["Party poopers",1],
	["Sunshine and rainbows",1],
	["YOU MUST CONSTRUCT ADDITIONAL PYLONS",1],
	["Mutually-assured destruction",1],
	["Heath Ledger",1],
	["Sexting",1],
	["An Oedipus complex",1],
	["Eating all of the cookies before the AIDS bake-sale",1],
	["A sausage festival",1],
	["Michael Jackson",1],
	["Skeletor",1],
	["Chivalry",1],
	["Sharing needles",1],
	["Being rich",1],
	["Muzzy",1],
	["Count Chocula",1],
	["Spontaneous human combustion",1],
	["College",1],
	["Necrophilia",1],
	["The Chinese gymnastics team",1],
	["Global warming",1],
	["Farting and walking away",1],
	["Emotions",1],
	["Uppercuts",1],
	["Cookie Monster devouring the Eucharist wafers",1],
	["Stifling a iggle at the mention of Hutus and Tutsis",1],
	["Penis envy",1],
	["Letting yourself go",1],
	["White people",1],
	["Dick Cheney",1],
	["Leaving an awkward voicemail",1],
	["Yeast",1],
	["Natural selection",1],
	["Masturbation",1],
	["Twinkies ®",1],
	["A LAN Party",1],
	["Opposable thumbs",1],
	["A grande sugar-free iced soy caramel macchiato",1],
	["Soiling oneself",1],
	["A sassy black woman",1],
	["Sperm whales",1],
	["Teaching a robot to love",1],
	["Scrubbing under the folds",1],
	["A drive-by shooting",1],
	["Whipping it out",1],
	["Panda sex",1],
	["Catapults",1],
	["Will Smith",1],
	["Toni Morrison's vagina",1],
	["Five-Dollar Foot-longs ™",1],
	["Land minds",1],
	["A sea of troubles",1],
	["A zesty breakfast burrito",1],
	["Christopher Walken",1],
	["Friction",1],
	["Balls",1],
	["AIDS",1],
	["The KKK",1],
	["Figgy pudding",1],
	["Seppuku",1],
	["Marky Mark and the Funky Bunch",1],
	["Gandhi",1],
	["Dave Matthews Band",1],
	["Preteens",1],
	["The token minority",1],
	["Friends with benefits",1],
	["Re-gifting",1],
	["Pixelated bukkake",1],
	["Substitute teachers",1],
	["Take-backsies",1],
	["A thermonuclear detonation",1],
	["The Tempur-Pedic ® Swedish Sleep System ™",1],
	["Waiting 'til marriage",1],
	["A tiny horse",1],
	["A can of whoop-ass",1],
	["Dental dams",1],
	["Feeding Rosie O'Donnell",1],
	["Old-people smell",1],
	["Genghis Khan",1],
	["Authentic Mexican cuisine",1],
	["Oversized lollipops",1],
	["Garth Brooks",1],
	["Keanu Reeves",1],
	["Drinking alone",1],
	["The American Dream",1],
	["Taking off your shirt",1],
	["Giving 110%",1],
	["Flesh-eating bacteria",1],
	["Child abuse",1],
	["A cooler full of organs",1],
	["A moment of silence",1],
	["The Rapture",1],
	["Keeping Christ in Christmas",1],
	["RoboCop",1],
	["That one gay Teletubby",1],
	["Sweet, sweet vengeance",1],
	["Fancy Feast ®",1],
	["Pooping back and forth. Forever.",1],
	["Being a motherfucking sorcerer",1],
	["Jewish fraternities",1],
	["Edible underpants",1],
	["Poor people",1],
	["All-you-can-eat shrimp for $4.99",1],
	["Britney Spears at 55",1],
	["That thing that electrocutes your abs",1],
	["The folly of man",1],
	["Fiery poops",1],
	["Cards Against Humanity",1],
	["A murder most foul",1],
	["Me time",1],
	["The inevitable heat death of the universe",1],
	["Nocturnal emissions",1],
	["Daddy issues",1],
	["The hardworking Mexican",1],
	["Natalie Portman",1],
	["Waking up half-naked in a Denny's parking lot",1],
	["Nipple blades",1],
	["Assless chaps",1],
	["Full frontal nudity",1],
	["Hulk Hogan",1],
	["Passive-aggression",1],
	["Ronald Reagan",1],
	["Vehicular manslaughter",1],
	["Menstruation",1],
	["Pulling out",1],
	["Picking up girls at the abortion clinc",1],
	["The homosexual agenda",1],
	["The Holy Bible",1],
	["World peace",1],
	["Dropping a chandelier on your enemies and riding the rope up",1],
	["Testicular torsion",1],
	["The milk man",1],
	["A time-travel paradox",1],
	["Hot Pockets ®",1],
	["Guys who don't call",1],
	["Eating the last known bison",1],
	["Darth Vader",1],
	["Scalping",1],
	["Homeless people",1],
	["The World of Warcraft",1],
	["Gloryholes",1],
	["Saxophone solos",1],
	["Sean Connery",1],
	["God",1],
	["Intelligent design",1],
	["The taint; the grundle; the fleshy fun-bridge",1],
	["Friendly fire",1],
	["Keg stands",1],
	["Eugenics",1],
	["A good sniff",1],
	["Lockjaw",1],
	["A neglected Tamagotchi ™",1],
	["The People's Elbow",1],
	["Robert Downey, Jr.",1],
	["The heart of a child",1],
	["Seduction",1],
	["Smallpox blankets",1],
	["Licking things to claim them as your own",1],
	["A salty surprise",1],
	["Poorly-timed Holocaust jokes",1],
	["My soul",1],
	["My sex life",1],
	["Pterodactyl eggs",1],
	["Altar boys",1],
	["Forgetting the Alamo",1],
	["72 virgins",1],
	["Raping and pillaging",1],
	["Pedophiles",1],
	["Eastern European Turbo-folk music",1],
	["A snapping turtle biting the tip of your penis",1],
	["Pabst Blue Ribbon",1],
	["Domino's ™ Oreo ™ Dessert Pizza",1],
	["My collection of high-tech sex toys",1],
	["A middle-aged man on roller skates",1],
	["The Blood of Christ",1],
	["Half-assed foreplay",1],
	["Free samples",1],
	["Douchebags on their iPhones",1],
	["Hurricane Katrina",1],
	["Wearing underwear inside-out to avoid doing laundry",1],
	["Republicans",1],
	["The glass ceiling",1],
	["A foul mouth",1],
	["Jerking off into a pool of children's tears",1],
	["Getting really high",1],
	["The deformed",1],
	["Michelle Obama's arms",1],
	["Explosions",1],
	["The Übermensch",1],
	["Donald Trump",1],
	["Sarah Palin",1],
	["Attitude",1],
	["This answer is postmodern",1],
	["Crumpets with the Queen",1],
	["Frolicking",1],
	["Team-building exercises",1],
	["Repression",1],
	["Road head",1],
	["A bag of magic beans",1],
	["An asymmetric boob job",1],
	["Dead parents",1],
	["Public ridicule",1],
	["A mating display",1],
	["A mime having a stroke",1],
	["Stephen Hawking talking dirty",1],
	["African children",1],
	["Mouth herpes",1],
	["Overcompensation",1],
	["Bill Nye the Science Guy",1],
	["Bitches",1],
	["Italians",1],
	["Have some more kugel",1],
	["A windmill full of corpses",1],
	["Her Royal Highness, Queen Elizabeth II",1],
	["Crippling debt",1],
	["Adderall ™",1],
	["A stray pube",1],
	["Shorties and blunts",1],
	["Passing a kidney stone",1],
	["Prancing",1],
	["Leprosy",1],
	["A brain tumor",1],
	["Bees?",1],
	["Puppies!",1],
	["Cockfights",1],
	["Kim Jong-Il",1],
	["Hope",1],
	["8 oz. of sweet Mexican black-tar heroin",1],
	["Incest",1],
	["Grave robbing",1],
	["Asians who aren't good at math",1],
	["Alcoholism",1],
	["(I am doing Kegels right now.)",1],
	["Justin Bieber",1],
	["The Jews",1],
	["Bestiality",1],
	["Winking at old people",1],
	["Drum circles",1],
	["Kids with ass cancer",1],
	["Loose lips",1],
	["Auschwitz",1],
	["Civilian casualties",1],
	["Inappropriate yodeling",1],
	["Tangled Slinkys",1],
	["Being on fire",1],
	["The Thong Song",1],
	["A vajazzled vagina",1],
	["Riding off into the sunset",1],
	["Exchanging pleasantries",1],
	["My relationship status",1],
	["Shaquille O'Neals's acting career",1],
	["Being fabulous",1],
	["Lactation",1],
	["Not reciprocating oral sex",1],
	["Sobbing into a Hungry-Man ® Frozen Dinner",1],
	["My genitals",1],
	["Date rape",1],
	["Ring Pops ™",1],
	["GoGurt",1],
	["Judge Judy",1],
	["Lumberjack fantasies",1],
	["The gays",1],
	["Scientology",1],
	["Estrogen",1],
	["Police brutality",1],
	["Passable transvestites",1],
	["The Virginia Tech Massacre",1],
	["Tiger Woods",1],
	["Dick fingers",1],
	["Racism",1],
	["Glenn Beck being harried by a swarm of buzzards",1],
	["Surprise sex!",1],
	["Classist undertones",1],
	["Booby-trapping the house to foil burglars",1],
	["New Age music",1],
	["PCP",1],
	["A lifetime of sadness",1],
	["Doin' it in the butt",1],
	["Swooping",1],
	["The Hamburglar",1],
	["Tentacle porn",1],
	["A hot mess",1],
	["Too much hair gel",1],
	["A look-see",1],
	["Not giving a shit about the Third World",1],
	["American Gladiators",1],
	["The Kool-Aid man",1],
	["Mr Snuffleupagus",1],
	["Barack Obama",1],
	["Golden showers",1],
	["Wiping her butt",1],
	["Queefing",1],
	["Getting drunk on mouthwash",1],
	["An M. Night Shyamalan plot twist",1],
	["A robust mongoloid",1],
	["Nazis",1],
	["White privilege",1],
	["An erection that lasts longer than four hours",1],
	["A disappointing birthday party",1],
	["Puberty",1],
	["Two midgets shitting in a bucket",1],
	["Wifely duties",1],
	["The forbidden fruit",1],
	["Getting so angry that you pop a boner",1],
	["Sexual tension",1],
	["Third base",1],
	["A gassy antelope",1],
	["Those times when you get sand in your vagina",1],
	["A Super Soaker ™ full of cat pee",1],
	["Muhammad (Praise Be Unto Him)",1],
	["Racially-biased SAT questions",1],
	["Porn stars",1],
	["A fetus",1],
	["Obesity",1],
	["When you fart and a little bit comes out",1],
	["Oompa-Loompas",1],
	["BATMAN!!!",1],
	["Black people",1],
	["Tasteful sideboob",1],
	["Hot people",1],
	["Grandma",1],
	["Copping a feel",1],
	["The Trail of Tears",1],
	["Famine",1],
	["Finger painting",1],
	["The miracle of childbirth",1],
	["Goats eating cans",1],
	["A monkey smoking a cigar",1],
	["Faith healing",1],
	["Parting the Red Sea",1],
	["Dead babies",1],
	["The Amish",1],
	["Impotence",1],
	["Child beauty pageants",1],
	["Centaurs",1],
	["AXE Body Spray",1],
	["Kanye West",1],
	["Women's suffrage",1],
	["Children on leashes",1],
	["Harry Potter erotica",1],
	["The Dance of the Sugar Plum Fairy",1],
	["Lance Armstrong's missing testicle",1],
	["Dwarf tossing",1],
	["Mathletes",1],
	["Lunchables ™",1],
	["Women in yogurt commercials",1],
	["John Wilkes Booth",1],
	["Powerful thighs",1],
	["Mr. Clean, right behind you",1],
	["Multiple stab wounds",1],
	["Cybernetic enhancements",1],
	["Serfdom",1],
	["Another god-damn vampire movie",1],
	["Glenn Beck catching his scrotum on a curtain hook",1],
	["A big hoopla about nothing",1],
	["Peeing a little bit",1],
	["The Hustle",1],
	["Ghosts",1],
	["Bananas in Pajamas",1],
	["Active listening",1],
	["Dry heaving",1],
	["Kamikaze pilots",1],
	["The Force",1],
	["Anal beads",1],
	["The Make-A-Wish ® Foundation",1],
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
	["Me llamo María José me gustan los libros, soy taciturna, vegetariana ___",2,1],
	["Cuando estoy triste pienso en ___ y se me pasa",2,1],
	["Si tanto te gusta ___ ¿Porqué no lo metes en tu casa?",2,1],
],
[ /* 3er elem - Edición LGTB */
	["Dentro de LGTB+, el + incluye a ___",3,1],
	["En el próximo Orgullo, habrá una carroza patrocinada por ___",3,1],
],
[ /* OG! */
	["___? There's an app for that",1,1],
	["Why can't I sleep at night? ___",1,1],
	["What's that smell? ___",1,1],
	["I got 99 problems but ___ ain't one.",1,1],
	["Who stole the cookies from the cookie jar? ___",1,1],
	["What's the next Happy Meal ® toy? ___",1,1],
	["Anthropologists have recently discovered a primitive tribe that worships ___",1,1],
	["It's a pity that kids these days are all getting involved with ___",1,1],
	["During Picasso's often-overlooked Brown Period, he produced hundreds of paintings of ___",1,1],
	["Alternative medicine is now embracing the curative powers of ___",1,1],
	["What's that sound? ___",1,1],
	["What ended my last relationship? ___",1,1],
	["MTV's new reality TV show features eight washed-up celebrities living with ___",1,1],
	["I drink to forget ___",1,1],
	["I'm sorry, I couldn't complete my homework because of ___",1,1],
	["What is Batman's guilty pleasure? ___",1,1],
	["This is the way the world ends \ This is the way the world ends \ Not with a bang but with ___",1,1],
	["What's a girl's best friend? ___",1,1],
	["TSA guidelines now prohibit ___ on airplanes.",1,1],
	["___. That's how I want to die.",1,1],
	["In the new Disney Channel Original Movie, Hannah Montana struggles with ___ for the first time.",1,1],
	["___ is a slippery slope that leads to ___",1,1],
	["What does Dick Cheney prefer? ___",1,1],
	["I wish I hadn't lost the instruction manual for ___",1,1],
	["Instead of coal, Santa now gives the bad children ___",1,1],
	["What's the most emo? ___",1,1],
	["In 1,000 years, when paper money is but a distant memory, ___ will be our currency.",1,1],
	["A romantic, candlelit dinner would be incomplete without ___",1,1],
	["___. Betcha can't have just one!",1,1],
	["White people like ___",1,1],
	["___. High five, bro.",1,1],
	["Next from J.K. Rowling: Harry Potter and Chamber of ___",1,1],
	["BILLY MAYS HERE FOR ___",1,1],
	["War! What is it good for? ___",1,1],
	["During sex, I like to think about ___",1,1],
	["What are my parents hiding from me? ___",1,1],
	["What will always get you laid? ___",1,1],
	["When I'm in prison, I'll have ___ smuggled in.",1,1],
	["What did I bring back from Mexico? ___",1,1],
	["What don't you want to find in your Chinese food? ___",1,1],
	["What will I bring back in time to convince people that I am a powerful wizard? ___",1,1],
	["How am I maintaining my relationship status? ___",1,1],
	["Coming to Broadway this season, ___: The Musical.",1,1],
	["While the United States raced the Soviet Union to the moon, the Mexican government funnelled millions of pesos into research on ___",1,1],
	["After Hurricane Katrina, Sean Penn brought ___ to the people of New Orleans.",1,1],
	["Due to a PR fiasco, Walmart no longer offers ___",1,1],
	["But before I kill you Mr. Bond, I must show you ___",1,1],
	["What gives me uncontrollable gas? ___",1,1],
	["What do old people smell like? ___",1,1],
	["The class field trip was completely ruined by ___",1,1],
	["When Pharaoh remained unmoved, Moses called down a Plague of ___",1,1],
	["What's my secret power? ___",1,1],
	["what's there a ton of in heaven? ___",1,1],
	["What would grandma find disturbing, yet oddly charming? ___",1,1],
	["The US has begun airdropping ___ to the children of Afghanistan.",1,1],
	["What helps Obama unwind? ___",1,1],
	["What did Vin Diesel eat for dinner? ___",1,1],
	["___: good to the last drop.",1,1],
	["Why am I sticky? ___",1,1],
	["What gets better with age? ___",1,1],
	["___: kid-tested, mother-approved.",1,1],
	["What's the crustiest? ___",1,1],
	["What's Teach for America using to inspire inner city students to succeed? ___",1,1],
	["Studies show that lab rats navigate mazes 50% faster after being exposed to ___",1,1],
	["Life was difficult for cavemen before ___",1,1],
	["I do not know with what weapons World War III will be fought, but World War IV will be fought with ___",1,1],
	["Why do I hurt all over? ___",1,1],
	["What am I giving up for Lent? ___",1,1],
	["In Michael Jackson's final moments, he thought about ___",1,1],
	["In an attempt to reach a wider audience, the Smithsonian Museum of Natural History has opened an interactive exhibit on ___",1,1],
	["When I am President of the United States, I will create the department of ___",1,1],
	["When I am a billionare, I shall erect a 50-foot statue to commemorate ___",1,1],
	["What's my anti-drug? ___",1,1],
	["What never fails to liven up the party? ___",1,1],
	["What's the new fad diet? ___",1,1],
	["Major League Baseball has banned ___ for giving players an unfair advantage.",1,1],
	["And the Academy Award for ___ goes to ===",1,2],
	["For my next trick, I will pull ___ out of ===",1,2],
	["What's the next superhero/sidekick duo? ___ ===",1,2],
	["In M. Night Shyamalan's new movie, Bruce Willis discovers that ___ had really been === all along",1,2],
	["In a world ravaged by ___, our only solace is ===",1,2],
	["In his new summer commedy, Rob Schneider is ___ trapped in the body of ===",1,2],
	["Rumour has it that Vladimir Putin's favorite dish is ___ stuffed with ===",1,2],
	["I never truly understood ___ until I encountered ===",1,2],
	["Lifetime ® presents ___, the story of ===",1,2],
	["When I was tripping on acid, ___ turned into ===",1,2],
	["That's right, I killed ___. How, you ask? ===",1,2],
	["Make a haiku. ___ === +++",1,3],
	["___ + === = +++",1,3],
]
];


