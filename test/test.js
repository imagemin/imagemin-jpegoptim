'use strict';

var bufferEqual = require('buffer-equal');
var isJpg = require('is-jpg');
var jpegoptim = require('../');
var path = require('path');
var read = require('vinyl-file').read;
var test = require('ava');

test('optimize a JPG', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test.jpg'), function (err, file) {
		t.assert(!err);

		var stream = jpegoptim();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size);
			t.assert(isJpg(data.contents));
		});

		stream.end(file);
	});
});

test('skip optimizing a non-JPG file', function (t) {
	t.plan(2);

	read(__filename, function (err, file) {
		t.assert(!err);

		var stream = jpegoptim();
		var contents = file.contents;

		stream.on('data', function (data) {
			t.assert(bufferEqual(data.contents, contents));
		});

		stream.end(file);
	});
});

test('skip optimizing an already optimized JPG', function (t) {
	t.plan(2);

	read(path.join(__dirname, 'fixtures/test-smallest.jpg'), function (err, file) {
		t.assert(!err);

		var stream = jpegoptim();

		stream.on('data', function (data) {
			t.assert(bufferEqual(data.contents, file.contents));
		});

		stream.end(file);
	});
});

test('throw error when a JPG is corrupt', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test-corrupt.jpg'), function (err, file) {
		t.assert(!err);

		var stream = jpegoptim();

		stream.on('error', function (err) {
			t.assert(err);
			t.assert(/JFIF/.test(err.message));
		});

		stream.end(file);
	});
});
