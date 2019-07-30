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

export default (selector, listener) => (e) => {
	const disabledAncestor = closest(e.target, disabledElementsSelector);
	const closestNode = closest(e.target, selector);
	const isDelegated =
		!e.currentTarget.contains(disabledAncestor) &&
		e.currentTarget.contains(closestNode) &&
		e.currentTarget !== e.target;
	if (isDelegated) {
		e.delegateTarget = closestNode;
		listener(e);
	}
};
