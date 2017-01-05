'use strict'

/*
1.less编译，压缩，合并
2.JS合并，压缩，混淆
3.img复制
4.html压缩
*/

//在gulpfile中先载入gulp包
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');


//1.less编译，压缩，--合并没有必要，一般预处理css都可以导包
gulp.task('style',function(){
	//这里是在执行style任务时自动执行的
	gulp.src(['src/style/*.less','!src/style/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/style'))
	.pipe(browsersync.reload({
		stream:true
	}));
});




var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
//2.JS合并，压缩，混淆
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browsersync.reload({
		stream:true
	}));
})


//3.img复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browsersync.reload({
		stream:true
	}));
})

//4.html压缩
var htmlmin=require('gulp-htmlmin');

gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browsersync.reload({
		stream:true
	}));
})

//5本地服务器
var browsersync=require('browser-sync')
gulp.task('serve',function(){
	browsersync({
		server:{
			baseDir:['dist/']
		}
		
	},function(err,bs){
		console.log(bs.options.getIn(["urls","local"]));
	});

	gulp.watch('src/style/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.*',['html']);
})