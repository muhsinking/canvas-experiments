// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify')
    rename = require('gulp-rename'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),

// Lint Task
gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Sass
gulp.task('sass', function() {
    return gulp.src('assets/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/css'));
});

// Compile Jade
gulp.task('jade', function () {
	return gulp.src('assets/views/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('public'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    // return gulp.src('assets/js/*.js')
    return gulp.src('assets/js/pixel-fire.js')
    // return gulp.src('assets/js/untitled.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('assets/views/*.jade', ['jade']);
    gulp.watch('assets/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'jade', 'watch']);
