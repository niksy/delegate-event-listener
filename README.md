# delegate-event-listener

[![Build Status][ci-img]][ci]
[![BrowserStack Status][browserstack-img]][browserstack]

Delegate event listener.

Features:

-   Flexible usage with native `addEventListener` and `removeEventListener`
-   Current target reference with `event.delegateTarget` property
-   Prevents listener triggering if target element is inside form `[disabled]`
    element
-   Handles delegating of non-delegated events such as `focus`, `blur`,
    `mouseenter/leave`, `pointerenter/leave`

## Install

```sh
npm install delegate-event-listener --save
```

## Usage

Given following markup and JS functionality clicking only on `#frankie` will
trigger event listener even though event handler is attached on `#jackie`.

```html
<div id="jackie">
	<div id="frankie">Frankie</div>
	<div id="sally">Sally</div>
</div>
```

```js
import delegate from 'delegate-event-listener';

const element = document.querySelector('#jackie');

element.addEventListener(
	'click',
	delegate('#frankie', (e) => {
		// e.delegateTarget === document.querySelector('#frankie')
		// Clicked on #frankie!
	})
);

// Delegating non-delegated events such as `focus` is achieved with alternative function output
element.addEventListener(
	...delegate('focus', '#frankie', (e) => {
		// e.delegateTarget === document.querySelector('#frankie')
		// Clicked on #frankie!
	})
);
```

## API

### delegate([eventName, ]selector, listener)

Returns: `Function|array`

Delegated function.

If delegate function call contains 3 arguments, first argument is event name
which will then be used to resolve proper delegated event. Array of values is
then returned, first argument being event name used to fix event (e.g.
`mouseover` for `mouseenter`), and second argument being event handler. Those
values should then be applied to `addEventListener` (either via spreading or
manual assignment).

Original event (one which was supplied to function) is available as
`event.originalEventType`. Resolved event is available to native `event.type`:

#### eventName

Type: `string`

Event name. Used only for alternative function output. Event will be mapped to
proper delegatable event (e.g. `mouseenter` for `mouseover`).

#### selector

Type: `string`

CSS selector whose ancestor is element on which event handler is attached. If
it’s empty string, event handler will be attached to element which called
`addEventListener`.

#### listener

Type: `Function`

Event listener for event handler.

Native `Event` object is decorated with `event.delegateTarget` property. This
property is same as node resolved from selector. `event.currentTarget` is equal
to node on which event listener is attached.

For non-delegated event handlers attached directly to an element,
`event.delegateTarget` will always be equal to `event.currentTarget`.

## FAQ

### Triggering custom event doesn’t run listener function

Event propagation in `Event` constructor is not active by default. You have to
explicitly enable it.

```js
document.body.addEventListener(
	'click',
	delegate('button', () => {
		// …
	})
);

// Setting `bubbles: true` makes event propagation active
document
	.querySelector('button')
	.dispatchEvent(new Event('click', { bubbles: true }));
```

## Browser support

Tested in IE9+ and all modern browsers.

## Test

For automated tests, run `npm run test:automated` (append `:watch` for watcher
support).

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://travis-ci.com/niksy/delegate-event-listener
[ci-img]: https://travis-ci.com/niksy/delegate-event-listener.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=M1I1MHNIL2l2N1lSTVRNMjdEU09haDdKS2MvR0VNdjNLL3c5NGVydDJ0UT0tLUNCNTFvYWFwRjYzWkZjaEJsMEVXaGc9PQ==--61b9e0c915eac985bb6c4a299b2d37e55f33ff8e

<!-- prettier-ignore-end -->
