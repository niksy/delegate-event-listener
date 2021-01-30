import closest from 'dom-closest';

const disabledElementsSelector = [
	'input',
	'textarea',
	'button',
	'select',
	'form'
]
	.map((element) => `${element}[disabled]`)
	.join(',');

const eventNameMap = {
	focus: 'focusin',
	blur: 'focusout',
	mouseenter: 'mouseover',
	mouseleave: 'mouseout',
	pointerenter: 'pointerover',
	pointerleave: 'pointerout'
};

export default (...arguments_) => {
	const handleEventName = arguments_.length === 3;

	if (!handleEventName) {
		arguments_.unshift(null);
	}

	const [eventName, selector, listener] = arguments_;

	const wrappedListener = (e) => {
		if (selector === '') {
			e.delegateTarget = e.target;
			if (handleEventName) {
				e.originalEventType = eventName;
			}
			listener(e);
			return;
		}

		const disabledAncestor = closest(e.target, disabledElementsSelector);
		const closestNode = closest(e.target, selector);
		const isDelegated =
			!e.currentTarget.contains(disabledAncestor) &&
			e.currentTarget.contains(closestNode) &&
			e.currentTarget !== e.target;
		if (isDelegated) {
			e.delegateTarget = closestNode;
			if (handleEventName) {
				e.originalEventType = eventName;
			}
			if (
				handleEventName &&
				typeof eventNameMap[eventName] !== 'undefined' &&
				eventName !== 'focus' &&
				eventName !== 'blur'
			) {
				const delegateTarget = e.delegateTarget;
				const relatedTarget = e.relatedTarget;
				if (!relatedTarget || !delegateTarget.contains(relatedTarget)) {
					listener(e);
				}
			} else {
				listener(e);
			}
		}
	};

	if (handleEventName) {
		return [eventNameMap[eventName] ?? eventName, wrappedListener];
	}
	return wrappedListener;
};
