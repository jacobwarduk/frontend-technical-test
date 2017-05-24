const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const babel = require('babel-register');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');
const mocha = require('gulp-mocha');
const server = require('gulp-develop-server');
const fs = require("fs");
const del = require("del");
const runSequence = require("run-sequence");


gulp.task('js', function () {
   return browserify({entries: './src/app.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js:watch', function () {
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('sass', function () {
    return gulp.src('./src/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('test', () => {
    return gulp.src('./test/*.spec.js', {read: false})
        .pipe(mocha({
            compilers: babel,
            require: ['./setupTest.js']
        }));
});

gulp.task('server', function () {
    server.listen( { path: './index.js' } );
});

gulp.task('server:watch', function () {
    gulp.watch( [ './server.js' ], server.restart );
});

gulp.task('vendor:install:scripts', function() {
	return browserify({entries: './node_modules/vue/dist/vue.esm.js', extensions: ['.js'], debug: true})
		.transform('babelify', {presets: ['es2015']})
		.bundle()
		.pipe(source('vue.esm.js'))
		.pipe(gulp.dest('./dist/scripts'));
});

gulp.task('vendor:install:styles', function () {
	return gulp.src([
        './node_modules/foundation-grid/grid.css'
      ])
		.pipe(gulp.dest('./dist/styles'));
});

gulp.task('clean:dist', function (done) {
	if (fs.existsSync('./dist')) {
		return del('./dist/*');
	}
	done();
});

gulp.task('default', function (done) {
	runSequence(
		'clean:dist',
		[
			'vendor:install:scripts',
			'vendor:install:styles',
			'sass',
			'js'
		],
		[
			'sass:watch',
			'js:watch'
		],
		'server',
		'server:watch',
		function callback() {
			return done;
		}
	)
});


	//gulp.start('clean:dist', 'vendor:install:scripts', 'vendor:install:styles', 'sass', 'sass:watch', 'js', 'js:watch', 'server', 'server:watch');});
