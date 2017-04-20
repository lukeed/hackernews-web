import fetch from 'unfetch';

function get(uri) {
	return fetch(`/api/${uri}`).then(res => res.json()).then(res => res.data);
}

export function getComments(arr) {
	console.log('getComments received', arr);
	return get(`comment/${ arr.join(',') }`);
	// return get(`comment/${ Array.isArray(id) ? id.join(',') : id }`);
}

export function getItem(id) {
	return get(`item/${id}`);
}

export function getItems(ids) {
	return Promise.all(ids.map(getItem));
}

export function getPage(type, page) {
	return get(`${type}?page=${page}`);
}
