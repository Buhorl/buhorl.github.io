var sound_gba = "https://www.myinstants.com/media/sounds/original-game-boy-advance-startup-www_flvto_com.mp3"

function init() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('body').append("<span class=\"overlay\" style><p> Por favor, abre este enlace en un Ordenador </p><button class=\"\" onclick=\"play();\"> O no, pero al menos rota la página antes de hacer click aquí, pls </button>" +
			/*"<button onclick=\"play();\"> O pasa de mi y abrelo en el movil. Solo soy un botón, no un policía </button>"+
			"<br><a href=\"./renderer.html\"> O haz click aquí para ir al entorno de pruebas </a> "+*/
            "</span>");
    } else {
        $('body').append("<span class=\"overlay\">" +
            "<button class=\"big\" onclick=\"play();\"> ??? </button>" +
            //"<br><a href=\"./renderer.html\"> O aquí para ir al entorno de pruebas </a>"+
            "</span>");
        //start_story();
    }
}

function play() {
    $('.overlay').remove();
    sound_1.volume(0);
    readStory("ºº¡¡FELIZ CUMPLEAÑOS ANA!!ºº", 0);
    sound_5.play();
    setTimeout(function () {
        blinkElem('dialog', 9, 50);
        $('.target_gameboy').removeClass();
        readDialog(8, 'Old Man', "It's Dangerous to go alone, take this: <br> _ 1 4 _ | _ _ P _ <br> 3 _ _ L | _ 2 P 8", 50);
    },3100)
}
