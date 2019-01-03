import closest from 'dom-closest';

export default ( selector, listener ) => ( e ) => {
	const isDelegated = (
		closest(e.target, selector) === e.target &&
		e.currentTarget.contains(e.target) &&
		e.currentTarget !== e.target
	);
	if ( isDelegated ) {
		listener(e);
	}
};
