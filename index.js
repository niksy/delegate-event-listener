import closest from 'dom-closest';

export default ( selector, listener ) => ( e ) => {
	const isDelegated = (
		e.currentTarget.contains(closest(e.target, selector)) &&
		e.currentTarget !== e.target
	);
	if ( isDelegated ) {
		listener(e);
	}
};
