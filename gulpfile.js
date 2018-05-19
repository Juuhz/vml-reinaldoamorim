var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' );

gulp.task('sass', function () {
    return gulp.src( './src/sass/style.sass' )
    .pipe( sass( {outputStyle: 'compressed'} ).on( 'error', sass.logError ) )
    .on( 'error', function( error ){ console.error( error.message ); })
    .pipe( gulp.dest( './public' ) )
});

gulp.task( 'watch', function() {
    gulp.watch([ './src/sass/**/*.sass'], ['sass']);
});

gulp.task( 'build', ['sass'] );