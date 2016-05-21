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

	const args = [
		'--strip-all',
		'--strip-iptc',
		'--strip-icc',
		'--stdin',
		'--stdout'
	];

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
