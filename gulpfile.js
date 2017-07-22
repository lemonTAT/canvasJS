var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch([
    'mockapi/api/**/*.*',
    'webapp/src/assets/icons/**.*',
    'webapp/src/assets/images/**.*',
    'webapp/src/assets/scripts/**.*',
    'webapp/src/assets/styles/**.*',
    'webapp/routes/**.*',
    'webapp/src/views/*.*',
  ], function (event) {
    setTimeout(
        function(){livereload.changed(event.path)}, 1000);
  });
});
gulp.task('default', ['watch']);