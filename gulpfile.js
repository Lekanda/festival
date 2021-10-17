// API de Gulp para trabajar con el.'src' para identificar el archivo. 'dest'
const {parallel,src, dest,watch} = require('gulp');

/******* CSS ******/
// Con 'gulp-sass' conectamos con el compilador de SASS. Por eso hace falta 2 require
const sass = require('gulp-sass')(require('sass'));
// const sass = require('gulp-dart-sass'); // sustituye a las 2 anteriores.
// Plumber
const plumber = require('gulp-plumber');// No para el codigo sí error en scss.
const autoprefixer = require('autoprefixer');// Se asegura que funciona en el navegador
const cssnano = require('cssnano');// Comprime el coddigo CSS
const postcss = require('gulp-postcss');// Transforma por medio de los 2 anteriores.
const sourcemaps = require('gulp-sourcemaps');// EN EL NAVEGADOR se pueden ver los estilos aunque este puesto en cssnano.


// IMAGENES
// Minificar las imagenes. Version 8 no funciona instalar la 7.1.0
const cache = require('gulp-cache');// Necesario para imagemin
const imagemin = require('gulp-imagemin');// Aligera la imagen.@7.1.0
// Imagenes WEBP
const webp = require('gulp-webp');
// Imagenes AVIF(Formato nuevo)
const avif = require('gulp-avif');
// Mejora el codigo JS
const terser = require('gulp-terser-js');



// Compila SASS
function css(done) {
    // Identificar el archivo 'scss' a compilar
    src('src/scss/**/*.scss') // 'pipe' hace esperar hasta que esta lista la anterior
        .pipe(sourcemaps.init())
        .pipe(plumber()) // No para el codigo sí error en scss.
        .pipe(sass()) // Compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))//
        .pipe(sourcemaps.write('.'))// '.': Misma ubicacion que  la hoja de estilos CSS
        .pipe(dest('build/css')) // Almacenarla
    done();
}



// Minimifica las imagenes
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    //Identifica las imagenes
    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}



// Convierte a webp y guarda 
function versionWebp(done) {
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{jpg,png}') // Busca
        .pipe(webp(opciones)) // convierte
        .pipe(dest('build/img')) // guarda
    done();
}


// Convierte imagenes a AVIF y guarda 
function versionAvif(done) {
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{jpg,png}') // Busca
        .pipe(avif(opciones)) // convierte
        .pipe(dest('build/img')) // guarda
    done();
}

// Compila JS a /build
function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))
    done();
}


// Mira cambios en CSS.
function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}



exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes,versionWebp,versionAvif,javascript,dev);
// parallel: ejecuta todas a la vez
// serie: una detras de otra



