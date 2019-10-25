'use strict'

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    // cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();

const path = {
  styles: {
    src: "src/scss/**/*.scss",
    dist: "dist/css"
  }
}

function style() {
  return gulp.src(path.styles.src)
    // inisialisasi sourcemaps sebelum compilation dimulai
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // Use postcss with autoprefixer and compress the compiled file using cssnano
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions', '> 5%']})]))
    .pipe(sourcemaps.write())
    // path output
    .pipe(gulp.dest(path.styles.dist))    
    .pipe(browserSync.stream({match: '**/*.css'}));
}

function reload() {
  browserSync.reload();
}

function serve() {
  browserSync.init({
    injectChanges: true,
    port: 3000,
    server: "./dist"
  });
  
  gulp.watch(path.styles.src, style);
  gulp.watch("dist/*.html", reload);
}

// tugas yang akan berjalan secara paralel
exports.serve = serve;
exports.style = style;

const build = gulp.parallel(style, serve);
gulp.task('default', build);