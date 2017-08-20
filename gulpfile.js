var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var sass = require("gulp-sass");

gulp.task('js', function(){
   gulp.src('src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'));
});
gulp.task("sass", function(){
    gulp.src("src/css/style.scss")
        .pipe(concat('style.css'))
        .pipe(sass({ style: 'expanded' }))
        .pipe(minify())
		.pipe(gulp.dest("build/css/"))
});
gulp.task('css', function(){
    gulp.src('src/css/pikaday.css')
         .pipe(concat('pikaday.css'))
         .pipe(minify())
         .pipe(gulp.dest('build/css/'));
 });

gulp.task('default',['js','sass','css'],function(){
});

