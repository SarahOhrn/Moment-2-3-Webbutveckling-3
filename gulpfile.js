//VARIABLES
const { src, dest, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');


//PATHS
const files = {
    htmlPath: "src/**/*.html",
    sassPath: "src/**/*.scss",
    jsPath: "src/js/*.js",
    imagesPath: "src/images/*"
}

//HTML-TASK TO COPY THE HTML-CODE
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub'));
}

//SASS-TASK TO COPY THE CSS-CODE
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

//JS-TASK TO COPY THE JS-CODE
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(dest('pub/js'));
}

//IMAGE-TASK TO COPY THE IMAGE-CODE
function imagesTask() {
    return src(files.imagesPath)
        .pipe(imagemin())
        .pipe(dest('pub/images'));
}

//WATCH-TASK AND LIVESERVER, LOOKING FOR CHANGES IN SRC-CODE, WRITES TO PUB-FOLDER IF ANYTHING CHANGES. 
function watchTask() {
    browserSync.init({
        server: "./pub"
    });

    watch([files.htmlPath, files.jsPath, files.imagesPath, files.sassPath], parallel(copyHTML, sassTask, jsTask, imagesTask)).on('change', browserSync.reload);
}

//RUNS ALL TASKS AFTER EACH OTHER, WAHTCH-TASK IS LOOKING FOR CHANGES AND RUNS THE TASKS PARALLEL
exports.default = series(
    parallel(copyHTML, sassTask, jsTask, imagesTask),
    watchTask
);
