//Variabler
const { src, dest, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');


//Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    sassPath: "src/**/*.scss",
    jsPath: "src/js/*.js",
    imagePath: "src/images/*"
}

//HTML-task för att kopiera HTML-koden
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub'));
}

//SASS-task för att kopiera CSS-koden
function sassTask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('../maps'))
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

//Watch-task samt liveserver, letar efter förändringar i src-katalogen, blir det en förändring så skrivs den över till publiceringsmappen. 
function watchTask() {
    browserSync.init({
        server: "./pub"
    });

    watch([files.htmlPath, files.jsPath, files.imagePath, files.sassPath], parallel(copyHTML, sassTask, jsTask, imagesTask)).on('change', browserSync.reload);
}

//Kör alla tasks i en serie, dvs en efter en, watchtasken håller koll efter förändringar och kör tasksens parallelt
exports.default = series(
    parallel(copyHTML, sassTask, jsTask, imagesTask),
    watchTask
);