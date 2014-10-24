'use strict';

var isJpg = require('is-jpg');
var jpegoptim = require('jpegoptim-bin').path;
var spawn = require('child_process').spawn;
var through = require('through2');

/**
 * jpegoptim imagemin plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	return through.ctor({ objectMode: true }, function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new Error('Streaming is not supported'));
			return;
		}

		if (!isJpg(file.contents)) {
			cb(null, file);
			return;
		}

		var args = ['--strip-all', '--strip-iptc', '--strip-icc', '--stdin', '--stdout'];
		var err = '';
		var ret = [];
		var len = 0;

		if (opts.progressive) {
			args.push('--all-progressive');
		}

		if (opts.max !== undefined) {
			args.push('--max=' + opts.max);
		}

		if (opts.size) {
			args.push('--size=' + opts.size);
		}

		var cp = spawn(jpegoptim, args);

		cp.on('error', function (err) {
			cb(err);
			return;
		});

		cp.stderr.setEncoding('utf8');
		cp.stderr.on('data', function (data) {
			err += data;
		});

		cp.stdout.on('data', function (data) {
			ret.push(data);
			len += data.length;
		});

		cp.on('close', function (code) {
			if (code) {
				cb(new Error(err));
				return;
			}

			file.contents = Buffer.concat(ret, len);
			cb(null, file);
		});

		cp.stdin.end(file.contents);
	});
};
