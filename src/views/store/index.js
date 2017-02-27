firebase.initializeApp({
	databaseURL: 'https://hacker-news.firebaseio.com'
});

const API = firebase.database().ref('/v0');

function once(child) {
	return new Promise((resolve, reject) => {
		API.child(child).once('value', snap => resolve(snap.val()));
	});
}

function watch(child) {
}

function item(id) {
	return once(`item/${id}`);
}

export default {
	getType(type) {
		return once(`${type}stories`);
	},

	getItem(id) {
		return item(id);
	},

	getItems(ids) {
		return Promise.all(ids.map(id => item(id)));
	}
}
