# buhorl.github.io
Este repositorio está para subir y probar el renderer de texto y los "juegos" que haga en él.

En un futuro se subirá documentación, pero ahora mismo se encuentra en los comentarios de encima de las funciones de los archivos .js:
(El core del renderer se encuentra en el archivo renderer.js)
// To Do //

Significado de las letras de las descripciones:

|Letra|Significado|
|-|-|
|a|acción dentro del arbol de acciones (movimiento de stage)|
|m|movimiento dentro del arbol de acciones (movimiento de substage)|
|i|información/diálogo|
|r|vuelta atrás en el arbol|

Lista de funciones de historia hechas:
(Encontradas en Index.js)

Capítulo 0: Intro

|Subsección|Función|Desc.|
|-|-|-|
|0,0,0|start_story|Comienzo de la Historia|
|0,0,0|story_funct_1|Cómo te llamas|
|0,0,0|story_funct_1|¿Quieres jugar?|
|0,0,0|bot1_f|a: Si|
|0,0,0|bot2_f|a: Si|
|0,0,0|bot3_f|a: No|

Capítulo 1: Casa

|Subsección|Función|Desc.|
|-|-|-|
|0,0,0|start_story|Descripción de la casa|
|0,0,0|story_funct_1|Dialogo|
|0,0,0|story_funct_1|Descripción de acciones|
|0,0,0|bot1_f|m: Carpeta (1,0,0)|
|0,0,0|bot2_f|m: Nevera (2,0,0)|
|0,0,0|bot3_f|m: Puerta (3,0,0)|
|1,0,0|bot1_f|i: Abrirla (pista)|
|1,0,0|bot2_f|i: Levantarla|
|1,0,0|bot3_f|R: Volver|
|2,0,0|bot1_f|i: Abrirla|
|2,0,0|bot2_f|i: Inspeccionarla (pista)|
|2,0,0|bot3_f|R: Volver|
|3,0,0|bot1_f|i: Forzarla|
|3,0,0|bot2_f|a: Abrir el candado|
