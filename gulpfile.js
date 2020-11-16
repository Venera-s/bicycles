"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var clean = require("del");
var jsmin = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;
var jsconcat = require("gulp-concat");
var jsclear = require('gulp-strip-comments');


gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});


gulp.task("clean", function () {
  return clean("build");
});

gulp.task('copy', function () {
  return gulp.src([
    'source/*.html',
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/main.js'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});


gulp.task('js', function () {
  return pipeline(
    gulp.src(['source/js/*.js', '!source/js/main.js']),
    jsconcat('vendor.min.js'),
    jsmin(),
    gulp.dest('build/js')
  );
});

gulp.task('jsclear', function () {
  return gulp.src('build/js/*.js')
    .pipe(jsclear())
    .pipe(gulp.dest('build'));
});

gulp.task("server", function () {
  server.init({
    server: "build/"
  });

  gulp.task('update', function () {
    return gulp.src([
      'source/*.html',
      'source/js/main.js'
    ], {
      base: 'source'
    })
      .pipe(gulp.dest('build'));
  });

  gulp.task('refresh', function (done) {
    server.reload();
    done();
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite"));
  gulp.watch(['!source/js/main.js', 'source/js/*.js'], gulp.series('js', 'refresh'));
  gulp.watch(['source/js/main.js', 'source/*.html'], gulp.series('update', 'refresh'));
});

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "js"));
gulp.task("start", gulp.series("build", "server"));
