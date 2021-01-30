# Changelog

## [Unreleased][]

## [1.2.0][] - 2021-01-30

### Added

-   Support for non-delegated events
    ([#5](https://github.com/niksy/delegate-event-listener/issues/5))

-   Documentation about custom events and event propagation

### Changed

-   Empty string selector bounds event handler to element which called
    `addEventListener`

## [1.1.0][] - 2019-07-30

### Changed

-   Add `event.delegateTarget` property to `Event` object
-   Prevent listener triggering if one of ancestors is disabled form element
-   Upgrade package

## [1.0.1][] - 2019-04-03

### Fixed

-   Elements inside selector which is used as delegation are now properly
    matched

## [1.0.0][] - 2019-01-04

### Added

-   Initial implementation

[1.1.0]:
	https://github.com/niksy/delegate-event-listener/compare/v1.0.1...v1.1.0
[1.0.1]:
	https://github.com/niksy/delegate-event-listener/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/niksy/delegate-event-listener/tree/v1.0.0
[unreleased]:
	https://github.com/niksy/delegate-event-listener/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/niksy/delegate-event-listener/tree/v1.2.0
