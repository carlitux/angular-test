var plumber = require('gulp-plumber');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = ('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var envify = require('envify/custom');


gulp.task('sass', function() {
  // sass and compass
  gulp.src('frontend/scss/**/*.scss')
    .pipe(plumber())
    .pipe(compass({
      css: 'frontend/css',
      sass: 'frontend/scss',
      image: 'frontend/images'
    }))
    /* .pipe(minifyCSS()) */
    .pipe(gulp.dest('public/styles'))
    .pipe(livereload())
    .on('error', function(error) {
      // Would like to catch the error here
      console.log(error);
      this.emit('end');
    });
});


gulp.task('javascript', function() {
  // build frontend files
  browserify({
    entries: 'frontend/javascript/app.js',
    extensions: ['.js'],
    debug: true
  })
  .transform(babelify, {presets: ["es2015"]})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('public/javascript'))
  .pipe(livereload());
});

gulp.task('javascript-prod', function() {
  // build frontend files
  browserify({
    entries: 'frontend/javascript/app.js',
    extensions: ['.js']
  })
  .transform(envify({
    NODE_ENV: 'production'
  }))
  .transform(babelify, {presets: ["es2015"]})
  .bundle()
  .pipe(source('app.js'))
  .pipe(streamify(uglify()))
  .pipe(gulp.dest('public/javascript'));
});

gulp.task('watch', function() {
  gulp.watch('./frontend/scss/*.scss', ['sass']);
  gulp.watch('./frontend/javascript/**/*.js', ['javascript']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee nunjucks',
    ignore: ['frontend', 'public'],
    stdout: false
  }).on('readable', function () {
    this.stdout.on('data', function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'sass',
  'javascript',
  'develop',
  'watch'
]);

gulp.task('build', ['sass', 'javascript-prod']);
