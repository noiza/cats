var gulp = require('gulp'),
    sass = require('gulp-sass'),
		browserSync = require('browser-sync').create(),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglifyjs');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(['src/scss/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream());
});

gulp.task('fonts', function() {
	return gulp.src('src/bower_components/bootstrap/fonts/*')
	.pipe(gulp.dest('src/fonts'));
});

// Move the js files into our src/js folder
gulp.task('js', function() {
return gulp.src([
		'src/bower_components/jquery/dist/jquery.min.js',
		'src/bower_components/angular/angular.min.js',
		'src/bower_components/bootstrap/dist/js/bootstrap.min.js',
		'src/js/common.js'
	])
	.pipe(concat('script.min.js')) //concat() - объединение файлов
	.pipe(uglify()) //uglify() - сжатие файлов
	.pipe(gulp.dest('src/js'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: "./src"
	});

  gulp.watch('src/scss/*.scss', ['sass']);
	gulp.watch('src/js/common.js').on('change', browserSync.reload);
	gulp.watch('src/*.html').on('change', browserSync.reload);
});

//gulp.task('default', ['js', 'serve']);
gulp.task('default', ['fonts', 'serve']);
