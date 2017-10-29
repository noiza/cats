var gulp = require('gulp'),
    sass = require('gulp-sass'),
		browserSync = require('browser-sync').create();

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(['src/scss/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream());
});

// Move the js files into our src/js folder
// gulp.task('js', function() {
// 	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
// 	.pipe(gulp.dest("src/js"))
// 	.pipe(browserSync.stream());
// });

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
gulp.task('default', ['serve']);
