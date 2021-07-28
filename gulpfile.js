/* -------------------------------------------------------------------------- */
/*                                   MODULES                                  */
/* -------------------------------------------------------------------------- */
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const imagewebp = require('gulp-webp');
const rename = require('gulp-rename');

// Use dart-sass for @use
//sass.compiler = require('dart-sass');

/* -------------------------------------------------------------------------- */
/*                                  SASS TASK                                 */
/* -------------------------------------------------------------------------- */
function scssTask() {
	return src('app/scss/style.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(rename({suffix: '.min'}))
		.pipe(dest('dist/css', { sourcemaps: '.' }));
}

/* -------------------------------------------------------------------------- */
/*                               JAVASCRIPT TASK                              */
/* -------------------------------------------------------------------------- */
function jsTask() {
	return src('app/js/scripts.js', { sourcemaps: true })
		.pipe(babel({ presets: ['@babel/preset-env'] }))
		.pipe(terser())
		.pipe(rename({suffix: '.min'}))
		.pipe(dest('dist/js', { sourcemaps: '.' }));
}

/* -------------------------------------------------------------------------- */
/*                                BROWSER SYNC                                */
/* -------------------------------------------------------------------------- */
function browserSyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: '.',
		},
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
			},
		},
	});
	cb();
}
function browserSyncReload(cb) {
	browsersync.reload();
	cb();
}
/* -------------------------------------------------------------------------- */
/*                                  WEBP TASK                                 */
/* -------------------------------------------------------------------------- */
function webpImage() {
	return src('img/**/*.{jpg,png}')
		.pipe(imagewebp())
		.pipe(dest('dist/images'))
};

/* -------------------------------------------------------------------------- */
/*                                 WATCH TASK                                 */
/* -------------------------------------------------------------------------- */
function watchTask() {
	watch('*.html', browserSyncReload);
	watch(
		['app/scss/**/*.scss', 'app/**/*.js', 'img/**/*.{jpg,png}'],
		series(scssTask, jsTask,webpImage, browserSyncReload)
	);
}

/* -------------------------------------------------------------------------- */
/*                                  COPY TASK                                 */
/* -------------------------------------------------------------------------- */

function copyIMG() {
	return src('img/*.{svg,ico}')
	  .pipe(dest('dist/images'));
}

function copyB() {
	return src('app/css/*.*')
	.pipe(dest('dist/css'))
}

function copyBJS() {
	return src('app/js/bootstrap.bundle.min.*')
	.pipe(dest('dist/js'))
}




/* -------------------------------------------------------------------------- */
/*                                  GULP TASK                                 */
/* -------------------------------------------------------------------------- */
exports.default = series(scssTask, jsTask, browserSyncServe, webpImage, copyIMG, copyB, copyBJS, watchTask);