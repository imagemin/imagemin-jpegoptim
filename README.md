# imagemin-jpegoptim [![Build Status](https://travis-ci.org/kevva/imagemin-jpegoptim.svg?branch=master)](https://travis-ci.org/kevva/imagemin-jpegoptim)

> jpegoptim [imagemin](https://github.com/kevva/imagemin) plugin

## Install

```bash
$ npm install --save imagemin-jpegoptim
```

## Usage

```js
var Imagemin = require('image-min');
var jpegoptim = require('imagemin-jpegoptim');

var imagemin = new Imagemin()
    .src('foo.jpg')
    .dest('foo-optimized.jpg')
    .use(jpegoptim({ progressive: true }));

imagemin.optimize();
```

## Options

### progressive

Type: `Boolean`  
Default: `false`

Lossless conversion to progressive.

## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
