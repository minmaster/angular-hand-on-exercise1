var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require("gulp-uglify");
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var ngHtml2Js = require('gulp-ng-html2js');
var concat = require('gulp-concat');
var serve = require('gulp-serve');

var paths = {
    src : './src',
    dist : './www'
};

var config = {
    sourceMaps : true,
    inlineSourceMaps : true,
    compress : false,
    basedir: paths.src,
    entries: ['./app/app.module.js'],
    paths: ['./'],
    destFolder : paths.dist+'/assets/js',
    destFile : 'app.js'
}

function compile(watch) {
    var bundler = browserify({
        entries: config.entries,
        basedir: config.basedir,
        debug: config.sourceMaps,
        paths: config.paths,
        cache: {},
        packageCache: {}
    })


    bundler.transform('babelify', {
        presets: ['es2015']
    });

    if (watch) {
        bundler = watchify(bundler);
        bundler.on('update', function() {
            console.log('--> bundling...');
            rebundle();
        })
        .on('log', function(msg) {
            console.log(msg);
        })
    }



    function rebundle() {
        var jsStream = bundler.bundle()
        .on('error', function(err) {
            console.error(err.message);
            this.emit('end');
        })

        .pipe(source(config.destFile))
        .pipe(buffer())

        .pipe(gulpif(config.sourceMaps && !config.inlineSourceMaps,sourcemaps.init({
            loadMaps: true
        })))
        .pipe(gulpif(config.compress,uglify({
            mangle: false,
        })))

        .pipe(gulpif(config.sourceMaps && !config.inlineSourceMaps,sourcemaps.write('.')))
        .pipe(gulp.dest(config.destFolder))
    }

    rebundle();
}

gulp.task('browserify',function() {
    return compile();
});
gulp.task('browserify:watch', function() {
    return compile(true);
});

gulp.task('templates', function () {
    return gulp.src([paths.src+'/app/**/*.html'])
        .pipe(ngHtml2Js({'moduleName': 'app.templates', declareModule : true, prefix: 'app/'}))
        .pipe(concat('app.templates.js'))
        .pipe(gulp.dest(paths.src+'/app/'));
});

gulp.task('copy-resources', ['copy-html']);

gulp.task('copy-html', function(done) {
    return gulp.src([paths.src+'/*.html'])
        .pipe(gulp.dest(paths.dist+'/'));
});

gulp.task('copy-data', function(done) {
    return gulp.src([paths.src+'/assets/data/*'])
        .pipe(gulp.dest(paths.dist+'/assets/data'));
});

gulp.task('build', function(callback) {
    runSequence('clean',
              ['templates', 'copy-resources', 'copy-data', 'browserify'],
              callback);
});

gulp.task('start', function(callback) {
    runSequence('serve',
              ['setWatch', 'browserify:watch'],
              callback);
});

gulp.task('clean', function () {
    return gulp.src(paths.dist)
        .pipe(clean());
});

gulp.task('serve', serve(paths.dist));

gulp.task('setWatch', function() {
    gulp.watch(paths.src+'/*.html', ['copy-resources']);
    gulp.watch(paths.src+'/**/*.html', ['templates']);
});
