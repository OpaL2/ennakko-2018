'use strict';

var gulp = require('gulp');
var cssmin = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var server = require('gulp-live-server');
var rename = require('gulp-rename');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');

gulp.task('sass', () => {
  return gulp.src('./frontend/src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(cssmin())
    .pipe( rename ( (path) => {
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest('./frontend/build/public/css/'));
});

gulp.task('sass:watch', () => {
  gulp.watch('frontend/src/sass/**/*.scss', ['sass']);
});

function js(startPath, targetFile) {
  return function() {
    return browserify({entries: startPath, debug: true, extensions: ['.jsx']})
      .transform(babelify, {presets: ['env', 'react']})
      .bundle()
      .on('error', function(err) {
        notify.onError({
          message: '<%= error.message %>'
        }).apply(this, arguments);

        this.emit('end');
      })
      .pipe(source(targetFile))
      .pipe(buffer())
      .pipe(gulp.dest('./frontend/build/public/js/'));
  };
}

gulp.task('react', js('frontend/src/react/App.jsx', 'App.min.js'));

gulp.task('react:watch', () => {
  gulp.watch('frontend/src/react/**/*.js*', ['react']);
});

gulp.task('js', js('frontend/src/js/App.js', 'App.min.js'));

gulp.task('compile', ['react', 'sass']);

gulp.task('js:watch', () => {
  gulp.watch('frontend/src/js/**/*.js*', ['js']);
});

gulp.task('watch', ['react:watch', 'sass:watch']);

gulp.task('server', () => {
  var app = server.new('app.js');
  app.start();
  gulp.watch(['frontend/build/public/**/*.min.js', 
    'frontend/build/public/**/*.min.css'], (f) => {
    console.log('frontend recompiled, notifying livereload');
    app.notify.apply(app, [f]);
  });
});

gulp.task('default', ['compile', 'server', 'watch']);