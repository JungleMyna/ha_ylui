/*jshint esversion:6*/
/**
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
const swPrecache = require('sw-precache');

const root_path = 'custom_components/ha_ylui/local'

// Clean "build" directory
const clean = () => {
  return del(['build/*'], {dot: true});
};
gulp.task('clean', clean);

// Copy "app" directory to "build" directory
const copy = () => {
  return gulp.src([root_path + '/**/*']).pipe(gulp.dest('build'));
};
gulp.task('copy', copy);


// Generate a service worker with sw-precache
const serviceWorker = () => {
  return swPrecache.write('build/sw.js', {
    staticFileGlobs: [
      'build/login.html',
      'build/index.html',
      'build/configs.js',
      'build/onLoad.js',
      'build/image/os_windows.png',
      'build/image/login.jpg',
      'build/image/start.jpg',
      'build/res/css/loading.css',      
      'build/res/yl.js',
      'build/langs/zh-cn.json',
      'build/res/components/jquery-2.2.4.min.js',
      'build/res/css/main.css',
      'build/res/css/yl-layer-skin.css',
      'build/res/components/layer-v3.0.3/layer/skin/default/layer.css',
      'build/res/css/tiles.css',
      'build/res/components/animate.css',
      'build/res/components/font-awesome-4.7.0/css/font-awesome.min.css',
      'build/res/components/calendar/style.css',
      'build/res/js/Yuri2.js',
      'build/res/components/vue.min.js',
      'build/res/js/yl-render.js',
      'build/res/js/yl-io.js',
      'build/res/components/calendar/script.js',
      'build/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2',
      'build/res/components/vue-grid-layout-2.1.11.min.js',
      'build/res/js/yl-vue-component-icon.js',
      'build/res/js/yl-vue-components.js',
      'build/res/components/layer-v3.0.3/layer/layer.full.js',
      'build/saves/basic.json',
    ],
    importScripts: [
      'sw-toolbox.js',
      'js/toolbox-script.js'
    ],
    stripPrefix: 'build/'
  });
};
gulp.task('service-worker', serviceWorker);

// This is the app's build process
const build = gulp.series('clean', 'copy', 'service-worker');
gulp.task('build', build);

// Build the app, run a local dev server, and rebuild on "app" file changes
const browserSyncOptions = {
  server: 'build',
  port: 8002
};
const serve = gulp.series(build, () => {
  browserSync.init(browserSyncOptions);
  return gulp.watch(root_path + '/**/*', build).on('change', browserSync.reload);
});

gulp.task('serve', serve);

// Set the default task to "build"
gulp.task('default', build);