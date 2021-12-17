# imagemin-jpegoptim

> [Imagemin](https://github.com/imagemin/imagemin) plugin for [jpegoptim](https://github.com/tjko/jpegoptim)

## Install

```
$ npm install imagemin-jpegoptim
```

See [`jpegoptim-bin`'s install section](https://github.com/imagemin/jpegoptim-bin#install) for requirements.

## Usage

```js
import imagemin from 'imagemin';
import imageminJpegoptim from 'imagemin-jpegoptim';

(async () => {
	await imagemin(['images/*.jpg'], {
		destination: 'build/images',
		plugins: [
			imageminJpegoptim()
		]
	});

	console.log('Images optimized');
})();
```

## API

### imageminJpegoptim(options?)(buffer)

Returns a `Promise<Buffer>`.

#### options

Type: `object`

##### progressive

Type: `boolean`\
Default: `false`

Lossless conversion to progressive.

##### max

Type: `number`

Set maximum image quality factor. (`0`-`100`).

##### size

Type: `number | string`

Try to optimize file to given size. Target size is specified either in kilo bytes (`1`-`n`) or as percentage (`1%`-`99%`).

##### stripAll

Type: `boolean`\
Default: `true`

Strip all markers from output file.

**Note**: If you want to control what markers are stripped, this *must* be set to `false`.

##### stripCom

Type: `boolean`\
Default: `true`

Strip comment markers from output file.

##### stripExif

Type: `boolean`\
Default: `true`

Strip EXIF markers from output file.

##### stripIptc

Type: `boolean`\
Default: `true`

Strip IPTC/Photoshop (APP13) markers from output file.

##### stripIcc

Type: `boolean`\
Default: `true`

Strip ICC profile markers from output file.

##### stripXmp

Type: `boolean`\
Default: `true`

Strip XMP markers markers from output file.

#### buffer

Type: `buffer`

Buffer to optimize.
