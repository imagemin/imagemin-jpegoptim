# imagemin-jpegoptim [![Build Status](http://img.shields.io/travis/imagemin/imagemin-jpegoptim.svg?style=flat)](https://travis-ci.org/imagemin/imagemin-jpegoptim) [![Build status](https://ci.appveyor.com/api/projects/status/dd2mjdl1lhqjj6u7?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-jpegoptim)

> [jpegoptim](https://github.com/tjko/jpegoptim) [imagemin](https://github.com/imagemin/imagemin) plugin


## Install

```
$ npm install --save imagemin-jpegoptim
```

See [jpegoptim-bin's install section](https://github.com/imagemin/jpegoptim-bin#install) for requirements.


## Usage

```js
var Imagemin = require('imagemin');
var imageminJpegoptim = require('imagemin-jpegoptim');

new Imagemin()
	.src('images/*.jpg')
	.dest('build/images')
	.use(imageminJpegoptim({progressive: true}))
	.run();
```

You can also use this plugin with gulp:

```js
var gulp = require('gulp');
var imageminJpegoptim = require('imagemin-jpegoptim');

gulp.task('default', function () {
	return gulp.src('images/*.jpg')
		.pipe(imageminJpegoptim({progressive: true})())
		.pipe(gulp.dest('build/images'));
});
```


## API

### imageminJpegoptim(options)

#### options.progressive

Type: `boolean`  
Default: `false`

Lossless conversion to progressive.

#### options.max

Type: `number`

Set maximum image quality factor. (`0` - `100`)

#### options.size

Type: `number` or `string`

Try to optimize file to given size. Target size is specified either in kilo bytes (`1` -) or as percentage (`1%` - `99%`).


## License

MIT © [imagemin](https://github.com/imagemin)
