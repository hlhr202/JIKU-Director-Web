var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('default', function () {
    gulp.src(['./ui/build/static/css/**/*']).pipe(gulp.dest('./public/static/css'));
    gulp.src(['ui/build/static/js/**/*']).pipe(gulp.dest('public/static/js'));
    gulp.src(['ui/build/static/media/**/*']).pipe(gulp.dest('public/static/media'));
    gulp.src(['ui/build/index.html']).pipe(rename('index.blade.php')).pipe(gulp.dest('resources/views/'));
})

//var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

//elixir(function(mix) {
//    mix.sass('app.scss');
//});