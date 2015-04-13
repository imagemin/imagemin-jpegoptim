'use strict';

var path = require('path');
var bufferEqual = require('buffer-equal');
var isJpg = require('is-jpg');
var read = require('vinyl-file').read;
var test = require('ava');
var imageminJpegoptim = require('../');

test('optimize a JPG', function (t) {
	t.plan(3);

	read(path.join(__dirname, 'fixtures/test.jpg'), function (err, file) {
		t.assert(!err, err);

		var stream = imageminJpegoptim()();
		var size = file.contents.length;

		stream.on('data', function (data) {
			t.assert(data.contents.length < size, data.contents.length);
			t.assert(isJpg(data.contents));
		});

		stream.end(file);
	});
});

test('skip optimizing a non-JPG file', function (t) {
	t.plan(2);

	read(__filename, function (err, file) {
		t.assert(!err, err);

		var stream = imageminJpegoptim()();
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
		t.assert(!err, err);

		var stream = imageminJpegoptim()();

		stream.on('data', function (data) {
			t.assert(bufferEqual(data.contents, file.contents));
		});

		stream.end(file);
	});
});

test('throw error when a small JPG is corrupt', function (t) {
	t.plan(4);

	read(path.join(__dirname, 'fixtures/test-corrupt.jpg'), function (err, file) {
		t.assert(!err, err);

		var stream = imageminJpegoptim()();

		stream.on('error', function (err) {
			t.assert(err);
			t.assert(path.basename(err.fileName) === 'test-corrupt.jpg', err.fileName);
			t.assert(/JFIF/.test(err.message), err.message);
		});

		stream.end(file);
	});
});

test('throw error when a large JPG is corrupt', function (t) {
	t.plan(4);

	read(path.join(__dirname, 'fixtures/test-corrupt-large.jpg'), function (err, file) {
		t.assert(!err, err);

		var stream = imageminJpegoptim()();

		stream.on('error', function (err) {
			t.assert(err);
			t.assert(path.basename(err.fileName) === 'test-corrupt-large.jpg', err.fileName);
			t.assert(/stdin/.test(err.message), err.message);
		});

		stream.end(file);
	});
});
