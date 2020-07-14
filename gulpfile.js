const gulp = require('gulp');
const babel = require('gulp-babel');

function javascript() {
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
}

exports.default = () => {
    gulp.watch('index.js', javascript);
}