import {Buffer} from 'node:buffer';
import {execa} from 'execa';
import isJpg from 'is-jpg';
import jpegoptim from 'jpegoptim-bin';

const imageminJpegoptim = options => async buffer => {
	options = {
		stripAll: true,
		stripCom: true,
		stripExif: true,
		stripIptc: true,
		stripIcc: true,
		stripXmp: true,
		...options,
	};

	if (!Buffer.isBuffer(buffer)) {
		return Promise.reject(new TypeError(`Expected a Buffer, got ${typeof buffer}`));
	}

	if (!isJpg(buffer)) {
		return Promise.resolve(buffer);
	}

	const args = [
		'--stdin',
		'--stdout',
	];

	if (options.stripAll) {
		args.push('--strip-all');
	}

	if (options.stripCom) {
		args.push('--strip-com');
	}

	if (options.stripExif) {
		args.push('--strip-exif');
	}

	if (options.stripIptc) {
		args.push('--strip-iptc');
	}

	if (options.stripIcc) {
		args.push('--strip-icc');
	}

	if (options.stripXmp) {
		args.push('--strip-xmp');
	}

	if (options.progressive) {
		args.push('--all-progressive');
	}

	if (options.max !== undefined) {
		args.push(`--max=${options.max}`);
	}

	if (options.size > 0) {
		args.push(`--size=${options.size}`);
	}

	const {stdout} = await execa(jpegoptim, args, {
		encoding: null,
		input: buffer,
		maxBuffer: Number.POSITIVE_INFINITY,
	});

	return stdout;
};

export default imageminJpegoptim;
