var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

//path
var src = 'public/src';
var dist = 'public/dist';
var paths = {
    js: src + '/js',
    scss: src + '/scss',
    html: src + '/view/**/*.html'
};

function errorAlert(error) {
    console.log(error.toString());//Prints Error to Console
    this.emit("end"); //End function
}

// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function () {
    return gulp.src(dist + '/')
        .pipe(webserver());
});

// 플러그인을 하나로 합친다
gulp.task('PLUGINS:combine', function () {
    return gulp.src([
            'node_modules/lodash/lodash.js',
            'node_modules/console-polyfill/index.js',
            'node_modules/moment/moment.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.js'
        ])
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(concat('plug-in.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/static/js'));
});

// Fonts : 나눔바른고딕
gulp.task('FONTS:webfont', function() {
    return gulp.src([
            'public/lib/awesome-bootstrap-checkbox.css',
            'public/lib/nanumfont/fonts.css',
            'public/lib/nanumfont/fonts/NanumBarunGothic.*'
        ])
        .pipe(gulp.dest(dist + '/static/css/fonts'));
});

// image
gulp.task('IMAGES:common', function() {
    return gulp.src(src+'/img/**/*.*')
        .pipe(gulp.dest(dist + '/static/images/'));
});

// sass 파일을 css 로 컴파일한다.
gulp.task('SASS:compile', function () {
    return gulp.src(paths.scss + '/style.scss')
        .pipe(plumber({errorHandler: errorAlert}))
        .pipe(sass({outputStyle:'compressed'}))
        .pipe(gulp.dest(dist + '/static/css'));
});

// HTML 파일을 압축한다.
gulp.task('HTML:compress', function () {
    return gulp.src(src+'/view/**/*.html')
        // .pipe(minifyhtml())
        .pipe(gulp.dest(dist + '/'));
});

// 파일 변경 감지
gulp.task('watch', function () {
  // gulp.watch(paths.js, ['PLUGINS:combine']);
    gulp.watch(paths.scss + '/*.scss', ['SASS:compile']);
    gulp.watch(paths.scss + '/**/*.scss', ['SASS:compile']);
    gulp.watch(paths.html, ['HTML:compress']);
});

//기본 task 설정
gulp.task('default', [ 'server', 'PLUGINS:combine', 'FONTS:webfont' ,'SASS:compile',  'HTML:compress','IMAGES:common','watch']);
