import fs from 'fs';
import path from 'path';
import isJpg from 'is-jpg';
import isProgressive from 'is-progressive';
import pify from 'pify';
import test from 'ava';
import m from '.';

const fsP = pify(fs);

test('optimize a JPG', async t => {
	const buffer = await fsP.readFile(path.join(__dirname, 'fixtures/test.jpg'));
	const data = await m()(buffer);
	t.true(data.length < buffer.length);
	t.true(isJpg(data));
});

test('throw error when a JPG is corrupt', async t => {
	const buffer = await fsP.readFile(path.join(__dirname, 'fixtures/test-corrupt.jpg'));
	await t.throws(m()(buffer), /JFIF/);
});

test('throw error when a large JPG is corrupt', async t => {
	const buffer = await fsP.readFile(path.join(__dirname, 'fixtures/test-corrupt-large.jpg'));
	await t.throws(m()(buffer), /EPIPE|ERROR/);
});

test('progressive option', async t => {
	const buffer = await fsP.readFile(path.join(__dirname, 'fixtures/test.jpg'));
	const data = await m({progressive: true})(buffer);
	t.true(isProgressive.buffer(data));
});

test('throw on wrong input', async t => {
	await t.throws(m()('foo'), 'Expected a Buffer, got string');
});
