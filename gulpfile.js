// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var rev = require('gulp-rev-hash');
var browserSync = require('browser-sync').create();

//时间戳
gulp.task('rev', function () {
    gulp.src('index.html')
      .pipe(rev())
      .pipe(gulp.dest('.'));
});

// 编译Sass
gulp.task('sass', function () {
    // gulp.src('style/*.scss')
    //   .pipe(sass().on('error', sass.logError))
    //   .pipe(gulp.dest('dist'));
});

// 检查脚本
gulp.task('lint', function () {
    gulp.src('js/**/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// 合并，压缩文件
gulp.task('scripts', function () {
    gulp.src('js/**/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('dist'));
});

// 默认任务
gulp.task('default', ['sass', 'lint', 'scripts', 'rev'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(["dist/*.*"]).on("change", browserSync.reload);

    // 监听文件变化
    gulp.watch('js/**/*.js', ['lint', 'scripts', 'rev']);
    // gulp.watch('style/*.scss', ['sass', 'rev']);
});