// API de Gulp para trabajar con el.'src' para identificar el archivo. 'dest'
const {parallel,src, dest,watch} = require('gulp');
// Con 'gulp-sass' conectamos con el compilador de SASS. Por eso hace falta 2 require
const sass = require('gulp-sass')(require('sass'));
// const sass = require('gulp-dart-sass'); // sustituye a las 2 anteriores.

// Plumber
const plumber = require('gulp-plumber');

// Imagenes WEBP
const webp = require('gulp-webp');


// Compila SASS
function css(done) {
    // Identificar el archivo 'scss' a compilar
    src('src/scss/**/*.scss') // 'pipe' hace esperar hasta que esta lista la anterior
        .pipe(plumber()) // No para el codigo sí error en scss.
        .pipe(sass()) // Compilarlo
        .pipe(dest('build/css')) // Almacenarla
    done();
}


function versionWebp(done) {
    const opciones = {
        quality:50
    };
    src('src/img/**/*.{jpg,png}') // Busca
        .pipe(webp(opciones)) // convierte
        .pipe(dest('build/img')) // guarda
    done();
}





function dev(done) {
    watch('src/scss/**/*.scss', css);
    done();
}
exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp,dev);
// parallel: ejecuta todas a la vez
// serie: una detras de otra



