import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import executable from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('test executable and return true', async t => {
	t.true(await executable(path.join(__dirname, 'fixtures/optipng')));
});

test('test executable synchronously and return true', t => {
	t.true(executable.sync(path.join(__dirname, 'fixtures/optipng')));
});

test('test non-executable', async t => {
	const isWindows = process.platform === 'win32';
	// eslint-disable-next-line ava/use-t-well
	t[isWindows](await executable(path.join(__dirname, 'readme.md')));
});
