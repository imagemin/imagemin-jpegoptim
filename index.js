'use strict';
const execa = require('execa');
const isJpg = require('is-jpg');
const jpegoptim = require('jpegoptim-bin');

module.exports = opts => buf => {
	opts = Object.assign({
		stripAll: true,
		stripCom: true,
		stripExif: true,
		stripIptc: true,
		stripIcc: true,
		stripXmp: true
	}, opts);

	if (!Buffer.isBuffer(buf)) {
		return Promise.reject(new TypeError(`Expected a Buffer, got ${typeof buf}`));
	}

	if (!isJpg(buf)) {
		return Promise.resolve(buf);
	}

	const args = [
		'--stdin',
		'--stdout'
	];

	if (opts.stripAll) {
		args.push('--strip-all');
	}

	if (opts.stripCom) {
		args.push('--strip-com');
	}

	if (opts.stripExif) {
		args.push('--strip-exif');
	}

	if (opts.stripIptc) {
		args.push('--strip-iptc');
	}

	if (opts.stripIcc) {
		args.push('--strip-icc');
	}

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
