'use strict';

var isJpg = require('is-jpg');
var jpegoptim = require('jpegoptim-bin').path;
var path = require('path');
var spawn = require('child_process').spawn;

/**
 * jpegoptim image-min plugin
 *
 * @param {Object} opts
 * @api public
 */

module.exports = function (opts) {
	opts = opts || {};

	return function (file, imagemin, cb) {
		if (!isJpg(file.contents)) {
			cb();
			return;
		}

		var args = ['--strip-all', '--strip-iptc', '--strip-icc', '--stdin', '--stdout'];
		var err = '';
		var ret = [];
		var len = 0;

		if (opts.progressive) {
			args.push('--all-progressive');
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
			cb();
		});

		cp.stdin.end(file.contents);
	};
};
