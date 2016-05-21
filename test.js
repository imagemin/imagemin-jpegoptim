import fs from 'fs';
import path from 'path';
import isJpg from 'is-jpg';
import isProgressive from 'is-progressive';
import pify from 'pify';
import test from 'ava';
import m from './';

const fsP = pify(fs);

test('optimize a JPG', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures', 'test.jpg'));
	const data = await m()(buf);
	t.true(data.length < buf.length);
	t.true(isJpg(data));
});

test('throw error when a JPG is corrupt', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures', 'test-corrupt.jpg'));
	t.throws(m()(buf), /JFIF/);
});

test('throw error when a large JPG is corrupt', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures', 'test-corrupt-large.jpg'));
	t.throws(m()(buf), /stdin/);
});

test('progressive option', async t => {
	const buf = await fsP.readFile(path.join(__dirname, 'fixtures', 'test.jpg'));
	const data = await m({progressive: true})(buf);
	t.true(isProgressive.buffer(data));
});

test('throw on wrong input', async t => {
	t.throws(m()('foo'), 'Expected a Buffer, got string');
});
