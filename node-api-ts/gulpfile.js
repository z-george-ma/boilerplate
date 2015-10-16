var gulp  = require('gulp'),
    del   = require('del'),
    tsc   = require('gulp-tsc'),
    babel = require('gulp-babel'),
    spawn = require('child_process').spawn,
    node;

/* clean */
gulp.task('clean:es6', function (cb) {
  del.sync('es6/**/*', { force: true })
  cb()
})

gulp.task('clean:dist', function (cb) {
  del.sync('dist/**/*', { force: true })
  cb()
})

gulp.task('clean', ['clean:es6', 'clean:dist'])

gulp.task('compile:typescript', function(cb) {
  gulp.src(['src/**/*.ts'])
      .pipe(tsc({
        emitError: false
      }))
      .pipe(gulp.dest('es6/'))
      .on('end', function() { cb() })
})

gulp.task('compile:babel', ['compile:typescript'], function() {
  gulp.src(['es6/**/*.js'])
      .pipe(babel())
      .pipe(gulp.dest('dist/'))
      .on('end', function() { cb() })
})

gulp.task('compile', ['compile:typescript', 'compile:babel'])

gulp.task('serve', ['compile'], function() {
  if (node) node.kill()
  node = spawn('node', ['dist/app.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  })
})

gulp.task('watch', function() {
  gulp.watch('src/**/*.ts', ['compile'])
})

gulp.task('default', ['serve'], function() {
  gulp.watch('src/**/*.ts', ['serve'])
})

process.on('exit', function() {
  if (node) node.kill()
})
