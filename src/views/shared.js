export function on(evts, cb) {
	evts.split(' ').forEach(ev => addEventListener(ev, cb));
}

export function off(evts, cb) {
	evts.split(' ').forEach(ev => removeEventListener(ev, cb));
}
