var syntax        = 'scss', // Syntax: sass or scss;
		IMG 					= 'img';

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		iconfont      = require('gulp-iconfont');
		pxtorem       = require("gulp-pxtorem");
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		imagemin      = require('gulp-imagemin'),
		del           = require('del'),
		cache         = require('gulp-cache'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		webp          = require('gulp-webp'),
		webpcss       = require("gulp-webpcss"),
		rsync         = require('gulp-rsync');

		var webpcssOptions = {
			webpClass: '',
			noWebpClass: '.no-webp'
		};


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		tunnel: true, tunnel: "orangetrading", // Demonstration page: http://projectname.localtunnel.me
	})
});

gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(webpcss(webpcssOptions))
	.pipe(pxtorem({
  propWhiteList: [
    'font', 'font-size', 'line-height',
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'left', 'right', 'top', 'bottom',
    'width', 'height', 'min-width', 'max-width', 'max-height', 'min-height',
    'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
    'border-width', 'border-left-width', 'border-right-width', 'border-top-width', 'border-bottom-width', 'border'
  ],
}),)
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});



gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific/jquery.magnific-popup.min.js',
		'app/libs/jquery-mask/jquery.mask.min.js',
		'app/libs/wow/wow.min.js',
		'app/libs/owl.carousel/owl.carousel.min.js',
		'app/libs/swiper/swiper.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin())) // Cache Images
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'webp', 'styles', 'js'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

	var buildMail = gulp.src([
		'app/*.php',
		]).pipe(gulp.dest('dist/'));

	var buildHT = gulp.src([
		'app/ht.access',
		]).pipe(gulp.dest('dist/'));

});

gulp.task('webp', done => {
	gulp.src(IMG + '/img/*')
		.pipe(webp({ quality: 90 }))
		.pipe(gulp.dest(IMG));
	done();
});

gulp.task("iconfont", function() {
  return gulp
    .src(PATHS.src + "/img/svg-src/*.svg")
    .pipe(
      iconfont({
        fontName: "iconfont",
        formats: ["ttf", "woff", "svg"],
        appendCodepoints: true,
        appendUnicode: false,
        normalize: true,
        fontHeight: 1000,
        centerHorizontally: true
      })
    )
    .on("glyphs", function(glyphs, options) {
      gulp
        .src(PATHS.src + "/scss/iconfont-source/_icons-source.scss")
        .pipe(
          consolidate("underscore", {
            glyphs: glyphs,
            fontName: options.fontName,
            fontDate: new Date().getTime()
          })
        )
        .pipe($.rename("_icons.scss"))
        .pipe(gulp.dest(PATHS.src + "/scss"));

      gulp
        .src(PATHS.src + "/scss/iconfont-source/_icons-source.html")
        .pipe(
          consolidate("underscore", {
            glyphs: glyphs,
            fontName: options.fontName
          })
        )
        .pipe(gulp.dest(PATHS.build + "/iconfont"));
    })
    .pipe(gulp.dest(PATHS.src + "/fonts"));
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});


gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);


