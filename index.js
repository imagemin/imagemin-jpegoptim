'use strict';
const execa = require('execa');
const isJpg = require('is-jpg');
const jpegoptim = require('jpegoptim-bin');

module.exports = opts => buf => {
	opts = Object.assign({}, opts);

	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError(`Expected a Buffer, got ${typeof buf}`));
	}

	if (!isJpg(buf)) {
		return Promise.resolve(buf);
	}

	// Default is to strip all markers from output file
	opts.stripCom = typeof opts.stripCom !== 'undefined' ? opts.stripCom : true;
	opts.stripExif = typeof opts.stripExif !== 'undefined' ? opts.stripExif : true;
	opts.stripIptc = typeof opts.stripIptc !== 'undefined' ? opts.stripIptc : true;
	opts.stripIcc = typeof opts.stripIcc !== 'undefined' ? opts.stripIcc : true;
	opts.stripXmp = typeof opts.stripXmp !== 'undefined' ? opts.stripXmp : true;

	const args = [
		'--stdin',
		'--stdout'
	];

	// strip Comment markers from output file
	if (opts.stripCom) {
		args.push('--strip-com');
	}

	// strip Exif markers from output file
	if (opts.stripExif) {
		args.push('--strip-exif');
	}

	// strip IPTC/Photoshop (APP13) markers from output file
	if (opts.stripIptc) {
		args.push('--strip-iptc');
	}

	// strip ICC profile markers from output file
	if (opts.stripIcc) {
		args.push('--strip-icc');
	}

	// strip XMP markers markers from output file
	if (opts.stripXmp) {
		args.push('--strip-xmp');
	}

	if (opts.progressive) {
		args.push('--all-progressive');
	}

	if (opts.max !== undefined) {
		args.push(`--max=${opts.max}`);
	}

	if (opts.size) {
		args.push(`--size=${opts.size}`);
	}

	return execa.stdout(jpegoptim, args, {
		encoding: null,
		input: buf
	});
};
