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

| Option | Type | Default | Description | 
| ------ | ---- | ------- | ----------- |
| `progressive` | `boolean` | `false` | Lossless conversion to progressive. |
| `max` | `number` | _N/A_ | Set maximum image quality factor. (`0`-`100`). |
| `size` | `number`<br>`string` | _N/A_ | Try to optimize file to given size (disables lossless optimization mode). Target size is specified either in kilo bytes (`1`-`n`) or as percentage (`1%`-`99%`). |
| `stripCom` | `boolean` | `true` | Strip Comment markers from output file. |
| `stripExif` | `boolean` | `true` | Strip Exif markers from output file. |
| `stripIptc` | `boolean` | `true` | Strip IPTC/Photoshop (APP13) markers from output file. |
| `stripIcc` | `boolean` | `true` | Strip ICC profile markers from output file (_note: if your image seems to render differently between browsers/OSes, set this to `false`_). |
| `stripXmp` | `boolean` | `true` | Strip XMP markers markers from output file. |


#### buffer

Type: `buffer`

Buffer to optimize.


## License

MIT © [imagemin](https://github.com/imagemin)
