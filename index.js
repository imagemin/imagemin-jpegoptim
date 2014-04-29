'use strict';

var ExecBuffer = require('exec-buffer');
var imageType = require('image-type');
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
        if (imageType(file.contents) !== 'jpg') {
            return cb();
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
                    return cb(err);
                }

                file.contents = buf;
                cb();
            });
    };
};
