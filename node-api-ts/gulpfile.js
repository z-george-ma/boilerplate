var gulp     = require('gulp'),
    del      = require('del'),
    jasmine  = require('gulp-jasmine'),
    report   = require('jasmine-spec-reporter'),
    tsc      = require('gulp-tsc'),
    babel    = require('gulp-babel'),
    spawn    = require('child_process').spawn,
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

gulp.task('build:typescript', ['clean'], function(cb) {
  gulp.src(['src/**/*.ts'])
      .pipe(tsc({
        target: 'ES6',
        emitError: false,
        removeComments: true
      }))
      .pipe(gulp.dest('es6/'))
      .on('end', function() { cb() })
})

gulp.task('build:babel', ['build:typescript'], function(cb) {
  gulp.src(['es6/**/*.js'])
      .pipe(babel({ optional: ['runtime'] }))
      .pipe(gulp.dest('dist/'))
      .on('end', function() { cb() })
})

gulp.task('test', ['build:babel'], function() {
  gulp.src('dist/test/**/*.js')
      .pipe(jasmine({ reporter: new report() }))
})

gulp.task('build', ['build:typescript', 'build:babel', 'test'])

gulp.task('serve', ['build'], function() {
  if (node) node.kill()
  node = spawn('node', ['dist/app.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  })
})

gulp.task('watch', function() {
  gulp.watch('src/**/*.ts', ['build'])
})

gulp.task('default', ['serve'], function() {
  gulp.watch('src/**/*.ts', ['serve'])
})

process.on('exit', function() {
  if (node) node.kill()
})
