const { series, parallel, src, dest, watch } = require("gulp"); //Series = SI SE TIENEN MUCHAS FUNCIONES, PARA ENVIAR TODAS, SE UTILIZA EL SERIES
//Paralell = REALIZA TODAS LAS ACCIONES EN PARALELO
//Watch = Cuando en un archivo se realicen cambios, llama una funcion
const sass = require("gulp-sass");
const imagenmin = require("gulp-imagemin");
const notify = require("gulp-notify");
const webp = require("gulp-webp");
const concat = require("gulp-concat");

//Utilidades CSS

const autoprefixer = require("autoprefixer"); //Agrega prefijos
const postcss = require("gulp-postcss"); //Agrega un procesamiento al css
const cssnano = require("cssnano"); //Para hacer el codigo css en una sola linea.
const sourcemaps = require("gulp-sourcemaps");

//Utilidades JS

const terser = require("gulp-terser-js"); //Para minificar el codigo JS en una sola linea

//Funcion para compilar SASS
function compilarSASS() {
  console.log("Compilando SASS");
  return (
    src("src/scss/**/*.scss")
      .pipe(sourcemaps.init()) //Aca se inicia el "mapa"
      .pipe(sass())
      .pipe(postcss([autoprefixer(), cssnano()])) // Para que una funcion realice varias acciones a la vez, se pone entre [], las funciones que se quieren llevar a cabo
      .pipe(sourcemaps.write(".")) // En este escribe las referencias. Eso sirve ya que el css nano, es imposible de leer, el sourcemaps guarda las referencias, para poder saber
      //en que linea se tienen que realizar los cambios
      .pipe(dest("./build/css"))
  );
}

function minificarCSS() {
  return src("src/scss/app.scss")
    .pipe(
      sass({
        outputStyle: "compact", //Para que le cambie la forma en la que esta escrita el CSS, para que el archivo no pese tanto cuando se termina
      })
    )
    .pipe(dest("./build/css"));
}

function javaScript() {
  //Funcion para unir todos los archivos JS en uno solo
  return src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("bundle.js"))
    .pipe(terser()) //Terser funciona para hacer que todas las lineas que se encuentrar en el archivo, terminen en 1 sola, minificandolo
    .pipe(sourcemaps.write("."))
    .pipe(dest("./build/js"));
}

function imagenes() {
  //Esta funcion hace que las imagenes no sean tan pesadas
  return src("src/img/**/*") //Entrar a img, buscar todas las imagenes que esten ahi
    .pipe(imagenmin())
    .pipe(dest("./build/img"))
    .pipe(notify({ message: "Imagen Minificada" })); //Notificar cuando se realiza una accion, en este caso por cada imagen minificada, notifica
}

function versionWebP() {
  //Esta funcion hace que las imagenes sean menos pesadas todavia
  return src("src/img/**/*")
    .pipe(webp())
    .pipe(dest("./build/img"))
    .pipe(notify({ message: "Version WebP lista" }));
}

function watchArchivos() {
  watch("src/scss/**/*.scss", compilarSASS); //Como primer parametro, arhivo que esta 'viendo'. Segundo parametro, funcion que se quiere llevar a cabo
  //El * = carpeta actual
  //El ** todos los archivos con esa extension
  watch("src/js/**/*.js", javaScript);
}

exports.compilarSASS = compilarSASS;
exports.minificarCSS = minificarCSS;
exports.imagenes = imagenes;

exports.watchArchivos = watchArchivos; //Para que esta funcion se encuentre activa, se tiene que llamar una vez

exports.default = series(
  compilarSASS,
  javaScript,
  imagenes,
  versionWebP,
  watchArchivos
); //Primero corre la funcion "compilarSASS" y despues la funcion "imagenes" y por ultimo "watchArchivos"
//Para salir, o se borra la termina, o se hace CTRL C y termina esta tarea

// DATOS IMPORTANTES
//require para importar, exports para exportar las funciones

// function compilarSASS(done) {
//   console.log("Compilando SASS....");
//   done(); //Funcion de gulp. Sirve para que decir que la funcion padre, ya termino
// }

// function compilarJS(done) {
//   console.log("Compilando JS....");
//   done();
// }

// function minificarHTML(done) {
//   console.log("Minificando HTML");
//   done();
// }

// exports.compilarSASS = compilarSASS;
// exports.compilarJS = compilarJS;
// exports.tareas = series(compilarSASS, compilarJS, minificarHTML); //Adentro se ponen las funciones
// exports.default = parallel(compilarSASS, compilarJS, minificarHTML); //Si se pone default, en la terminal con decir 'gulp' se van a realizar esta accion
