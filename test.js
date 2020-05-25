const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const isJpg = require('is-jpg');
const isProgressive = require('is-progressive');
const test = require('ava');
const m = require('.');

const readFile = promisify(fs.readFile);

test('optimize a JPG', async t => {
	const buffer = await readFile(path.join(__dirname, 'fixtures/test.jpg'));
	const data = await m()(buffer);
	t.true(data.length < buffer.length);
	t.true(isJpg(data));
});

test('throw error when a JPG is corrupt', async t => {
	const buffer = await readFile(path.join(__dirname, 'fixtures/test-corrupt.jpg'));
	await t.throwsAsync(async () => {
		await m()(buffer);
	}, {message: /JFIF/});
});

test('throw error when a large JPG is corrupt', async t => {
	const buffer = await readFile(path.join(__dirname, 'fixtures/test-corrupt-large.jpg'));
	await t.throwsAsync(async () => {
		await m()(buffer);
	}, {message: /EPIPE|ERROR/});
});

test('progressive option', async t => {
	const buffer = await readFile(path.join(__dirname, 'fixtures/test.jpg'));
	const data = await m({progressive: true})(buffer);
	t.true(isProgressive.buffer(data));
});

test('throw on wrong input', async t => {
	await t.throwsAsync(async () => {
		await m()('foo');
	}, {message: 'Expected a Buffer, got string'});
});
