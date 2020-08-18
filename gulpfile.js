const gulp = require('gulp');
const babel = require('gulp-babel');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');

function javascript(cb) {
    gulp.src('index.js')
        .pipe(babel({
            presets: [
                "@babel/preset-react"
            ],
            env: {
                production: {
                    presets: [
                        "@babel/preset-env"
                    ]
                }
            }
        }))
        .pipe(gulp.dest('dist'));
    cb();
}

function css(cb) {
    gulp.src('style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'));
    cb();
}

exports.javascript = javascript;
exports.css = css;

exports.watch = function () {
    gulp.watch(['*.js'], { ignoreInitial: false, events: 'all' }, javascript);
    gulp.watch('*.scss', { ignoreInitial: false, events: 'all' }, css);
}