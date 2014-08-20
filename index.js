'use strict';

var ExecBuffer = require('exec-buffer');
var isJpg = require('is-jpg');
var jpegoptim = require('jpegoptim-bin').path;
var mkdir = require('mkdirp');
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

        mkdir(exec.dest(), function (err) {
            if (err) {
                cb(err);
                return;
            }

            exec.use(jpegoptim, args.concat(['--dest=' + exec.dest(), exec.src()]));
            exec.dest(path.join(exec.dest(), path.basename(exec.src())));
            exec.run(file.contents, function (err, buf) {
                    if (err) {
                        cb(err);
                        return;
                    }

                    file.contents = buf;
                    cb();
                });
        });
    };
};
