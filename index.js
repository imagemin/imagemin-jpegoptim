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
	opts.stripCom = typeof opts.stripCom === 'undefined' ? true : opts.stripCom;
	opts.stripExif = typeof opts.stripExif === 'undefined' ? true : opts.stripExif;
	opts.stripIptc = typeof opts.stripIptc === 'undefined' ? true : opts.stripIptc;
	opts.stripIcc = typeof opts.stripIcc === 'undefined' ? true : opts.stripIcc;
	opts.stripXmp = typeof opts.stripXmp === 'undefined' ? true : opts.stripXmp;

	const args = [
		'--stdin',
		'--stdout'
	];

	// Strip Comment markers from output file
	if (opts.stripCom) {
		args.push('--strip-com');
	}

	// Strip Exif markers from output file
	if (opts.stripExif) {
		args.push('--strip-exif');
	}

	// Strip IPTC/Photoshop (APP13) markers from output file
	if (opts.stripIptc) {
		args.push('--strip-iptc');
	}

	// Strip ICC profile markers from output file
	if (opts.stripIcc) {
		args.push('--strip-icc');
	}

	// Strip XMP markers markers from output file
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
