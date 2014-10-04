'use strict';

var executable = require('../');
var path = require('path');
var test = require('ava');

test('test executable and return true', function (t) {
	t.plan(2);

	executable(path.join(__dirname, 'fixtures/optipng'), function (err, exec) {
		t.assert(!err);
		t.assert(exec);
	});
});

test('test executable synchronously and return true', function (t) {
	t.plan(1);
	t.assert(executable.sync(path.join(__dirname, 'fixtures/optipng')));
});

test('test non-executable', function (t) {
	t.plan(2);

	executable(path.join(__dirname, '../README.md'), function (err, exec) {
		t.assert(!err);
		t.assert(!exec);
	});
});
