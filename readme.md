# imagemin-jpegoptim [![Build Status](https://travis-ci.org/imagemin/imagemin-jpegoptim.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-jpegoptim) [![Build status](https://ci.appveyor.com/api/projects/status/dd2mjdl1lhqjj6u7?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-jpegoptim)

> [Imagemin](https://github.com/imagemin/imagemin) plugin for [jpegoptim](https://github.com/tjko/jpegoptim)


## Install

```
$ npm install imagemin-jpegoptim
```

See [`jpegoptim-bin`'s install section](https://github.com/imagemin/jpegoptim-bin#install) for requirements.


## Usage

```js
const imagemin = require('imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');

(async () => {
	await imagemin(['images/*.jpg'], 'build/images', {
		use: [
			imageminJpegoptim()
		]
	});

	console.log('Images optimized');
})();
```


## API

### imageminJpegoptim([options])(buffer)

Returns a `Promise<Buffer>`.

#### options

Type: `Object`

##### progressive

Type: `boolean`<br>
Default: `false`

Lossless conversion to progressive.

##### max

Type: `number`

Set maximum image quality factor. (`0`-`100`).

##### size

Type: `number` `string`

Try to optimize file to given size. Target size is specified either in kilo bytes (`1`-`n`) or as percentage (`1%`-`99%`).

##### stripAll

Type: `boolean`<br>
Default: `true`

Strip all markers from output file.

**Note**: If you want to control what markers are stripped, this *must* be set to `false`.

##### stripCom

Type: `boolean`<br>
Default: `true`

Strip comment markers from output file.

##### stripExif

Type: `boolean`<br>
Default: `true`

Strip EXIF markers from output file.

##### stripIptc

Type: `boolean`<br>
Default: `true`

Strip IPTC/Photoshop (APP13) markers from output file.

##### stripIcc

Type: `boolean`<br>
Default: `true`

Strip ICC profile markers from output file.

##### stripXmp

Type: `boolean`<br>
Default: `true`

Strip XMP markers markers from output file.


#### buffer

Type: `buffer`

Buffer to optimize.


## License

MIT © [Imagemin](https://github.com/imagemin)
