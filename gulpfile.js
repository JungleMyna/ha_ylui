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
  return del(['ylui/*'], {dot: true});
};
gulp.task('clean', clean);

// Copy "app" directory to "build" directory
const copy = () => {
  return gulp.src([root_path + '/**/*']).pipe(gulp.dest('ylui'));
};
gulp.task('copy', copy);


// Generate a service worker with sw-precache
const serviceWorker = () => {
  return swPrecache.write('ylui/sw.js', {
    staticFileGlobs: [
      'ylui/login.html',
      'ylui/index.html',
      'ylui/configs.js',
      'ylui/onLoad.js',
      'ylui/image/os_windows.png',
      'ylui/image/login.jpg',
      'ylui/image/start.jpg',
      'ylui/res/css/loading.css',      
      'ylui/res/yl.js',
      'ylui/langs/zh-cn.json',
      'ylui/res/components/jquery-2.2.4.min.js',
      'ylui/res/css/main.css',
      'ylui/res/css/yl-layer-skin.css',
      'ylui/res/components/layer-v3.0.3/layer/skin/default/layer.css',
      'ylui/res/css/tiles.css',
      'ylui/res/components/animate.css',
      'ylui/res/components/font-awesome-4.7.0/css/font-awesome.min.css',
      'ylui/res/components/calendar/style.css',
      'ylui/res/js/Yuri2.js',
      'ylui/res/components/vue.min.js',
      'ylui/res/js/yl-render.js',
      'ylui/res/js/yl-io.js',
      'ylui/res/components/calendar/script.js',
      'ylui/res/components/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2',
      'ylui/res/components/vue-grid-layout-2.1.11.min.js',
      'ylui/res/js/yl-vue-component-icon.js',
      'ylui/res/js/yl-vue-components.js',
      'ylui/res/components/layer-v3.0.3/layer/layer.full.js',
      'ylui/saves/basic.json',
    ],
    importScripts: [
      'sw-toolbox.js',
      'js/toolbox-script.js'
    ],
    stripPrefix: ''
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
  // browserSync.init(browserSyncOptions);
  return gulp.watch(root_path + '/**/*', build).on('change', browserSync.reload);
});

gulp.task('serve', serve);

// Set the default task to "build"
gulp.task('default', build);