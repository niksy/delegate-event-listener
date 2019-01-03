# delegate-event-listener

[![Build Status][ci-img]][ci] [![BrowserStack Status][browserstack-img]][browserstack]

Delegate event listener.

## Install

```sh
npm install delegate-event-listener --save
```

## Usage

Given following markup and JS functionality clicking only on `#frankie` will trigger event listener even though event handler is attached on `#jackie`.

```html
<div id="jackie">
	<div id="frankie">Frankie</div>
	<div id="sally">Sally</div>
</div>
```

```js
import delegate from 'delegate-event-listener';

const element = document.querySelector('#jackie');

element.addEventListener('click', delegate('#frankie', () => {
	// Clicked on #frankie!
}));
```

## API

### delegate(selector, listener)

Returns: `Function`

Delegated function.

#### selector

Type: `String`

CSS selector whose ancestor is element on which event handler is attached.

#### listener

Type: `Function`

Event listener for event handler.

## Browser support

Tested in IE9+ and all modern browsers.

## Test

For local automated tests, run `npm run test:automated:local` (append `:watch` for watcher support).

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.com/niksy/delegate-event-listener
[ci-img]: https://travis-ci.com/niksy/delegate-event-listener.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=<badge_key>
