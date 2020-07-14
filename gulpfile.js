const gulp = require('gulp');
const babel = require('gulp-babel');

exports.default = () =>
    gulp.src('index.js')
        .pipe(babel({
            presets: [
                '@babel/preset-env',
                "@babel/preset-react"
            ]
        }))
        .pipe(gulp.dest('dist'));