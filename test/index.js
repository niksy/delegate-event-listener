import assert from 'assert';
import sinon from 'sinon';
import simulant from 'simulant';
import fn from '../index';

let elements = [];

before(function() {
	window.fixture.load('/test/fixtures/index.html');
	elements = [
		document.querySelector('#jackie'),
		document.querySelector('#frankie'),
		document.querySelector('#sally'),
		document.querySelector('#moose')
	];
});

after(function() {
	window.fixture.cleanup();
});

it('should handle delegated event', function() {
	const [jackie, frankie, sally, moose] = elements;

	const callback = sinon.spy();
	const listener = fn('#frankie', callback);

	jackie.addEventListener('click', listener);

	simulant.fire(jackie, 'click');
	simulant.fire(frankie, 'click');
	simulant.fire(frankie, 'click');
	simulant.fire(sally, 'click');
	simulant.fire(moose, 'click');

	assert.equal(callback.called, true);
	assert.equal(callback.callCount, 3);

	jackie.removeEventListener('click', listener);
});

it('should handle unbounded delegated event', function() {
	const [jackie, frankie, sally, moose] = elements;

	const callback = sinon.spy();
	const listener = fn('#frankie', callback);

	jackie.addEventListener('click', listener);
	jackie.removeEventListener('click', listener);

	simulant.fire(jackie, 'click');
	simulant.fire(frankie, 'click');
	simulant.fire(sally, 'click');
	simulant.fire(moose, 'click');

	assert.equal(callback.called, false);
	assert.equal(callback.callCount, 0);
});
