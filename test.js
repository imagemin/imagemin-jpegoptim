import {promises as fs} from 'node:fs';
import isJpg from 'is-jpg';
import isProgressive from 'is-progressive';
import test from 'ava';
import imageminJpegoptim from './index.js';

test('optimize a JPG', async t => {
	const buffer = await fs.readFile(new URL('fixtures/test.jpg', import.meta.url));
	const data = await imageminJpegoptim()(buffer);
	t.true(data.length < buffer.length);
	t.true(isJpg(data));
});

test('throw error when a JPG is corrupt', async t => {
	const buffer = await fs.readFile(new URL('fixtures/test-corrupt.jpg', import.meta.url));
	await t.throwsAsync(async () => {
		await imageminJpegoptim()(buffer);
	}, {message: /JFIF/});
});

test('throw error when a large JPG is corrupt', async t => {
	const buffer = await fs.readFile(new URL('fixtures/test-corrupt-large.jpg', import.meta.url));
	await t.throwsAsync(async () => {
		await imageminJpegoptim()(buffer);
	}, {message: /EPIPE|ERROR/});
});

test('progressive option', async t => {
	const buffer = await fs.readFile(new URL('fixtures/test.jpg', import.meta.url));
	const data = await imageminJpegoptim({progressive: true})(buffer);
	t.true(isProgressive.buffer(data));
});

test('throw on wrong input', async t => {
	await t.throwsAsync(async () => {
		await imageminJpegoptim()('foo');
	}, {message: 'Expected a Buffer, got string'});
});
