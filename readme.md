# imagemin-jpegoptim [![Build Status](https://travis-ci.org/imagemin/imagemin-jpegoptim.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-jpegoptim) [![Build status](https://ci.appveyor.com/api/projects/status/dd2mjdl1lhqjj6u7?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-jpegoptim)

> [jpegoptim](https://github.com/tjko/jpegoptim) [imagemin](https://github.com/imagemin/imagemin) plugin


## Install

```
$ npm install --save imagemin-jpegoptim
```

See [jpegoptim-bin's install section](https://github.com/imagemin/jpegoptim-bin#install) for requirements.


## Usage

```js
const imagemin = require('imagemin');
const imageminJpegoptim = require('imagemin-jpegoptim');

imagemin(['images/*.jpg'], 'build/images', {
	use: [
		imageminJpegoptim()
	]
}).then(() => {
	console.log('Images optimized');
});
```


## API

### imageminJpegoptim([options])(buffer)

Returns a promise for a buffer.

#### options

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

Type: `boolean`  
Default: `true`

Strip all markers from output file. If you want to control what markers are stripped, this _must_ be set to `false`.

##### stripCom

Type: `boolean`  
Default: `true`

Strip Comment markers from output file. Requires `stripAll` to be `false`.

##### stripExif

Type: `boolean`  
Default: `true`

Strip Exif markers from output file. Requires `stripAll` to be `false`.

##### stripIptc

Type: `boolean`  
Default: `true`

Strip IPTC/Photoshop (APP13) markers from output file. Requires `stripAll` to be `false`.

##### stripIcc

Type: `boolean`  
Default: `true`

Strip ICC profile markers from output file. Requires `stripAll` to be `false`.

##### stripXmp

Type: `boolean`  
Default: `true`

Strip XMP markers markers from output file. Requires `stripAll` to be `false`.



#### buffer

Type: `buffer`

Buffer to optimize.


## License

MIT © [imagemin](https://github.com/imagemin)
