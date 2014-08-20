'use strict';

var ExecBuffer = require('exec-buffer');
var isJpg = require('is-jpg');
var jpegoptim = require('jpegoptim-bin').path;
var path = require('path');

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

        var args = ['--strip-all', '--strip-iptc', '--strip-icc'];
        var exec = new ExecBuffer();

        if (opts.progressive) {
            args.push('--all-progressive');
        }

        exec
            .use(jpegoptim, args.concat(['--dest="' + path.dirname(exec.dest()) + '"', exec.src()]))
            .run(file.contents, function (err, buf) {
                if (err) {
                    cb(err);
                    return;
                }

                file.contents = buf;
                cb();
            });
    };
};
