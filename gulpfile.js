const gulp = require('gulp');
const babel = require('gulp-babel');

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

exports.javascript = javascript;

exports.watch = function () {
    gulp.watch(['*.js'], { ignoreInitial: false, events: 'all' }, javascript);
}