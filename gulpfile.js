/*eslint-disable */
"use strict";

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps");
var livereload = require("gulp-livereload");

gulp.task("sass", function() {
  gulp
    .src("src/assets/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        errLogToConsole: true
      }).on("error", sass.logError)
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/assets/css"))
    .pipe(livereload());
});

gulp.task("watch", function() {
  livereload.listen({ start: true });
  gulp.watch("src/assets/sass/*.scss", ["sass"]);
});

gulp.task("start", ["watch", "sass"]);
