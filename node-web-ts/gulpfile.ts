/// <reference path="typings/tsd.d.ts" />
/// <reference path="typings/tsify.d.ts" />

import gulp       = require("gulp")
import sass       = require("gulp-sass")
import rename     = require("gulp-rename")
import uglifyJs   = require("gulp-uglify")
import uglifyCss  = require("gulp-minify-css")
import browserify = require("browserify")
import tsify      = require("tsify")
import source     = require("vinyl-source-stream")
import del        = require("del")
import replace    = require("gulp-replace")

/* clean */
gulp.task('clean:dist', () =>
  del('dist/**/*'))

/* vendor js */
gulp.task('vendor-js', () =>
  gulp.src([
    'bower_components/bootstrap-sass/assets/javascripts/*',
    'bower_components/jquery/dist/*'
  ]).pipe(gulp.dest('dist/assets/vendor')))

/* compile and uglify js */
gulp.task('compile-js', () =>
  browserify()
    .add("src/scripts/main.tsx")
    .plugin(tsify, { jsx: "react" })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest("dist/assets")))

gulp.task('uglify-js', ['compile-js'], () =>
  gulp.src('dist/assets/main.js')
    .pipe(uglifyJs())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('dist/assets')))

/* compile and uglify css */
gulp.task('compile-css', () =>
  gulp.src('src/styles/app.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/styles')))

gulp.task('uglify-css', ['compile-css'], () =>
  gulp.src('dist/assets/styles/app.css')
    .pipe(uglifyCss({ keepSpecialComments: 0 }))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('dist/assets/styles')))
    
/* fonts */
gulp.task('font-bootstrap', () => 
  gulp.src("bower_components/bootstrap-sass/assets/fonts/**/*")
    .pipe(gulp.dest('dist/assets/fonts')))

gulp.task('fonts', ['font-bootstrap'])

/* images */
gulp.task('images', () =>
  gulp.src(["src/images/**/*"])
    .pipe(gulp.dest("dist/assets/images")))
      
/* html */
gulp.task('html', () =>
  gulp.src([
    "src/*.html",
    "src/*.xml",
    "src/favicon.ico",
    "src/*.txt"
  ]).pipe(gulp.dest("dist")))

/* default */
gulp.task('default', [
  'vendor-js',
  'uglify-js',
  'uglify-css',
  'images',
  'fonts',
  'html'
])