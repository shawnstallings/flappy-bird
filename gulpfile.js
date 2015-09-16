
var gulp = require('gulp');

var //jshint = require('gulp-jshint'),
	//sass = require('gulp-sass'),
	//imagemin = require('gulp-imagemin'),
	browserify = require('browserify'),
	//uglify = require('gulp-uglify');
	//minifyHTML = require('gulp-minify-html'),
	//minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	source = require('vinyl-source-stream'),
	//buffer = require('vinyl-buffer'),
	//pngquant = require('imagemin-pngquant'),
	es = require('event-stream');


/* Javascript linting task
gulp.task('jshint', function() {
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe (jshint.reporter('default'));
}); */

/* Compile Sass task
gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'));
}); */

// Watch task
gulp.task('watch', function() {
	gulp.watch('js/*.js', ['jshint']);
	gulp.watch('scss/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

// Minify index
gulp.task('html', function() {
	return gulp.src('index.html')
		//.pipe(minifyHTML())
		.pipe(gulp.dest('build/'));
});

// Javascript build task, removes whitespace and concantenates all files
gulp.task('scripts', function() {
	//define js files to be bundled
	var files = [
		'./js/components/graphics/bird.js',
		'./js/components/graphics/pipe.js',
		'./js/components/physics/physics.js',
		'./js/entities/bird.js',
		'./js/entities/pipe.js',
		'./js/systems/graphics.js',
		'./js/systems/input.js',
		'./js/systems/physics.js',
		'./js/systems/pipes.js',
		'./js/flappy_bird.js',
		'./js/main.js'
	];
	//map them to our stream function
	var tasks = files.map(function(entry) {
		return browserify({ entries: [entry] })
			.bundle()
			.pipe(source(entry))
			// rename them to have "bundle as postfix"
			.pipe(rename({
				extname: '.bundle.js'
			}))
			.pipe(gulp.dest('./build'));
		});
	// create a merged stream
	return es.merge.apply(null, tasks);		
});

// Styles build task, concantenates all the style files
gulp.task('styles', function() {
	return gulp.src('css/*.css')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('build/css'));
});

// Minify css in build/css
gulp.task('minifyCSS', ['styles'], function() {
	return gulp.src('build/css/*.css')
		.pipe(minifyCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('build/css'));
});

/* Image optimization task
gulp.task('images', function() {
	return gulp.src('img/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewbox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('build/img'));
}); */

// Build task
gulp.task('build', ['styles', 'html', 'scripts']);