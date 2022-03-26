var 
    gulp = require('gulp'),
   	child_process = require('child_process'),
    webserver = require('gulp-webserver');


//SERVER
gulp.task('server', function(){
    //gulp.src('/Users/yangjiezheng/workspace/cloud-music/music-webview-musician/public')
    gulp.src('./src')
    .pipe(webserver({
        // host: '10.242.14.203',
        // host: '0.0.0.0',
        // port: 8033,
        // host: '0.0.0.0',
        port: 8003,
        //livereload: true,
        //directoryListing: true,
        fallback: 'index.html',
        open: true
    }));
});

//MCSS
gulp.task('mcss',function(){
	 //const process = child_process.exec('mcss -c ./src/mcss/mcss.json');
})
