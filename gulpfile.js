/*
* @Author: konstantinkuchernko
* @Date:   2017-05-28 10:01:26
* @Last Modified by:   konstantinkuchernko
* @Last Modified time: 2017-05-28 14:22:44
*/

var gulp = require('gulp'),
	notify = require("gulp-notify"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    clean = require('gulp-dest-clean'),
    browserSync = require('browser-sync').create()
    gulpSequence = require('gulp-sequence');

/*
*Compile sass создание файла css
*/

gulp.task('styles', function () {
  return gulp.src('./dev/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 4 versions']}))
    .pipe(gulp.dest('./prod/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(csso())
    .pipe(gulp.dest('./prod/css'))
    .pipe(notify({ message: 'Styles task complete' }));
    //.pipe(browserSync.stream());
});

/**
 * Compile js file сборка файлов js в один
 */

gulp.task('scripts', function() {
    return gulp.src(['./dev/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./prod/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./prod/js/'))
        .pipe(browserSync.stream())
        .pipe(notify({ message: 'Scripts task complete' }));
});

/**
 * Image compress сжатие изображений
 */

gulp.task('images', () =>
    gulp.src('./dev/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./prod/img/'))
        .pipe(notify({ message: 'Img task complete' }))
);

/**
 * Fonts перенос
 */

gulp.task('fonts', function() {
    gulp.src('./dev/fonts/*.*')
    .pipe(gulp.dest('./prod/fonts'))
    .pipe(notify({ message: 'Fonts task complete' }));
});


/**
 * lib js перенос файлов в папку prod 
 */

gulp.task('lib', function() {
    gulp.src('./dev/lib/*.*')
    .pipe(gulp.dest('./prod/lib'))
    .pipe(notify({ message: 'Lib task complete' }));
});

/**
 * Task clean удаляет все файлы из папки prod, которых нет в папке dev
 */

gulp.task('clean', function() {
 return gulp.src('./dev')
 .pipe(clean('./prod'))
 .pipe(notify({ message: 'Clean task complete' }));
});

/**
 * Browser synh синхронизация сервера
 */

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


/**
 * Watсher смотрит за изменением файлов и автоматически заменяет их
 */

gulp.task('watch', function() {
 browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./dev/sass/main.scss', ['styles', browserSync.reload]);
    gulp.watch('./dev/js/main.js', ['scripts', browserSync.reload]);
    gulp.watch("*.html").on("change", browserSync.reload);
});

/**
 * Task build выполняет все таски за один раз
 */

gulp.task('build', gulpSequence('clean', 'fonts', 'styles', 'scripts', 'images', 'lib', 'browser-sync'));