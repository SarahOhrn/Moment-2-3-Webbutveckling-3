//Variabler
const { src, dest, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const { init } = require('browser-sync');
const browserSync = require('browser-sync').create();

//Filer
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/css/*.css",
    jsPath: "src/js/*.js",
    imagePath: "src/images/*"
}

//HTML-task för att kopiera HTML-koden
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub'));
}

//CSS-task för att kopiera CSS-koden
function cssTask() {
    return src(files.cssPath)
        .pipe(concat('main.css'))
        .pipe(cssnano())
        .pipe(dest('pub/css'))
        .pipe(browserSync.stream());
}

//JS-task för att kopiera JS-koden
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(dest('pub/js'));
}

//Image-task för att kopiera bilder

function imageTask() {
    return src(files.imagePath)
        .pipe(imagemin())
        .pipe(dest('pub/images'));
}

//Watch-task för att kontrollera om något ändras i ursprungsfilerna för att sedan kopiera över dem på nytt
function watchTask() {

    browserSync.init({
        server: "./pub"
    });

    watch([files.htmlPath, files.cssPath, files.jsPath, files.imagePath], parallel(copyHTML, cssTask, jsTask, imageTask)).on('change', browserSync.reload);
}

//Exportera alla tasks för att kunna använda dem trots privata
exports.default = series(
    parallel(copyHTML, cssTask, jsTask, imageTask),
    watchTask
);