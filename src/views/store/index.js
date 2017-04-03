import fetch from 'unfetch';

function get(uri) {
	return fetch(`/api/${uri}`).then(res => res.json()).then(res => res.data);
}

export function getItem(id) {
	return get(`item/${id}`);
}

export function getItems(ids) {
	console.log('received', ids);
	return Promise.all(ids.map(getItem));
}

export function getType(type) {
	type = type.substr(1) || 'top';
	// return get(type).then(getItems);
	return get(type);
}
