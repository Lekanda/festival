// API de Gulp para trabajar con el.'src' para identificar el archivo. 'dest'
const {src, dest} = require('gulp');
// Con 'gulp-sass' conectamos con el compilador de SASS. Por eso hace falta 2 require
const sass = require('gulp-sass')(require('sass'));
// const sass = require('gulp-dart-sass'); // sustituye a las 2 anteriores.

function css(done) {
    // Identificar el archivo 'scss' a compilar
    src('src/scss/app.scss') // 'pipe' hace esperar hasta que esta lista la anterior
        .pipe(sass()) // Compilarlo
        .pipe(dest('build/css')) // Almacenarla
    
    done();
}
exports.css = css;