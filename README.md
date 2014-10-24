# imagemin-jpegoptim [![Build Status](http://img.shields.io/travis/imagemin/imagemin-jpegoptim.svg?style=flat)](https://travis-ci.org/imagemin/imagemin-jpegoptim) [![Build status](https://ci.appveyor.com/api/projects/status/dd2mjdl1lhqjj6u7)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-jpegoptim)

> jpegoptim [imagemin](https://github.com/imagemin/imagemin) plugin


## Install

```sh
$ npm install --save imagemin-jpegoptim
```


## Usage

```js
var Imagemin = require('imagemin');
var jpegoptim = require('imagemin-jpegoptim');

var imagemin = new Imagemin()
	.src('images/*.jpg')
	.dest('build/images')
	.use(jpegoptim({ progressive: true }));

imagemin.run(function (err, files) {
	if (err) {
		throw err;
	}

	console.log('Files optimized successfully!');
});
```

You can also use this plugin with gulp:

```js
var gulp = require('gulp');
var jpegoptim = require('imagemin-jpegoptim');

gulp.task('default', function () {
	return gulp.src('images/*.jpg')
		.pipe(jpegoptim({ progressive: true })())
		.pipe(gulp.dest('build/images'));
});
```

## Options

### progressive

Type: `Boolean`  
Default: `false`

Lossless conversion to progressive.

### max

Type: `Number`

Set maximum image quality factor. (`0` - `100`)

### size

Type: `Number` or `String`

Try to optimize file to given size. Target size is specified either in kilo bytes (`1` -) or as percentage (`1%` - `99%`).


## License

MIT © [imagemin](https://github.com/imagemin)
