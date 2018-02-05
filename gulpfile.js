'use strict';

var gulp = require('gulp');
var cssmin = require('gulp-clean-css');
var jsmin = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var server = require('gulp-live-server');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');

gulp.task('sass', () => {
  return gulp.src('./frontend/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(cssmin())
    .pipe( rename ( (path) => {
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest('./frontend/public/css/'));
});

gulp.task('sass:watch', () => {
  gulp.watch('frontend/sass/**/*.scss', ['sass']);
});

gulp.task('js:minify', () => {
  return gulp.src('./frontend/js/App.jsx')
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(babel({
      presets: ['env','react']
    }))
    .pipe(jsmin())
    .pipe(rename( (path) => {
      path.extname = '.min.js';
    }))
    .pipe(gulp.dest('./frontend/public/js/'));
});

gulp.task('js:minify:watch', () => {
  gulp.watch('frontend/js/**/*.js*', ['js:minify']);
});

gulp.task('watch', ['js:minify:watch', 'sass:watch']);

gulp.task('server', () => {
  var app = server.new('app.js');
  app.start();
});

gulp.task('default', ['server', 'watch']);