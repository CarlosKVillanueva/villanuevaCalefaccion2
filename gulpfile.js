const { src, dest, watch, series } = require('gulp');
const imagewebp = require('gulp-webp');


/* -------------------------------------------------------------------------- */
/*                               CONVERSOR WEBP                               */
/* -------------------------------------------------------------------------- */
function webpImage() {
    return src('img/**/*.{jpg,png}')
        .pipe(imagewebp())
        .pipe(dest('dist/images'))
};

//watchtask
watch('dist/images/**/*.{jpg,png}', webpImage);


// Default Gulp task 
exports.default = series(
    webpImage
);