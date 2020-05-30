const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const serve = require('gulp-serve');
const gulpCopy = require('gulp-copy');

gulp.task('styles', () => {
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/'));
});

gulp.task('clean', () => {
    return del([
        'build/main.css',
    ]);
});

gulp.task('copy', () => {
    return gulp.src('build/main.css').pipe(gulpCopy('docs'));
})

gulp.task('watch', () => {
    gulp.watch('src/**/*.scss', (done) => {
        gulp.series(['clean', 'styles', 'copy'])(done);
    });
});

gulp.task('serve', serve('docs'));

gulp.task('serve-build', serve(['docs', 'build']));

gulp.task('serve-prod', serve({
  root: ['docs', 'build'],
  port: 80,
  middleware: function(req, res) {
    // custom optional middleware
  }
}));

gulp.task('default', gulp.parallel(['watch', 'serve']));