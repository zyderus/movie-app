const { src, dest, watch, series, parallel } = require('gulp');
const nodemon = require('gulp-nodemon');
const browsersync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');

// Delay browsersync
function delaySync(done) {
  setTimeout(() => {
    browserSync(done);
  }, 300);
}

// Delay browsersync reload
function delayBsreload() {
  setTimeout(() => {
    browsersync.reload();
  }, 500);
}

// Transfer files
const transfer = () => {
  return src([
    '**/*',
    '**/.*',
    '!node_modules/**', 
    '!public/img/unoptimized/**',
    '!.env'
  ])
  .pipe(dest('dist/'));
}

// Reload page in browser
const browserSync = done => {
  browsersync.init(null, {
    proxy: 'http://localhost:5800',
    // files: ['public/**/*.scss', 'public/**/*.css', 'public/**/*.pug', 'public/**/*.js'],
    ignore: ['node_modules'],
    reloadDelay: 10,
    ui: false,              // disables UI on port 3001 (default port)
    notify: false,          // disables connection pop-up message at top-right corner
  }, done);
};

// Restart controller on change
const nodeMon = done => {
  const stream = nodemon({
    ext: 'js json',
    script: 'index.js',
    ignore: [
      'node_modules/',
      'public/',
      'views/',
      'package.json', 
      'package-lock.json'
    ],
    env: { 'NODE_ENV': 'development' }
  })
  .on('start', () => {
    delayBsreload();
  })
  .on('crash', () => {
    console.log('App crashed \n');
    stream.emit('restart', 1);
  });
  done();
};

// Delete dist folder
const clean = () => {
  return del('dist');
};

// Update html files on save
const html = () => {
  return src('views/**/*')
  .pipe(browsersync.stream());
};

// Process SCSS files
const style = () => {
  return src('public/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError)
  .pipe(concat('styles.min.css'))
  .pipe(postcss([ autoprefixer({
    overrideBrowserslist: ['last 5 versions']
  }) ]))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('public/css/'))
  .pipe(browsersync.stream());
};

// Process JavaScript files
const js = () => {
  return src('public/js/sources/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('main.min.js'))
  .pipe(terser())
  .pipe(sourcemaps.write('.'))
  .pipe(dest('public/js/'))
  .pipe(browsersync.stream());
};

// Process images
const images = () => {
  return src('public/img/unoptimized/**')
  .pipe(imagemin({
    optimizationLevel: 3 // 0 - 7
  }))
  .pipe(dest('public/img/'))
  .pipe(browsersync.stream());
};

// Watch files
const watchFiles = done => {
  watch('views/**/*', html);
  watch('public/scss/**/*.scss', style);
  watch('public/js/sources/**/*.js', js);
  watch('public/img/unoptimized/**/*', images);
  done();
}

exports.default = parallel(series(nodeMon, delaySync), watchFiles);
// exports.default = series(browserSync, nodeMon, watchFiles);
exports.build = series(clean, transfer);

exports.js = js;