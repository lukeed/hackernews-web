import Queue from 'p-queue';

const queue = new Queue({ concurrency: 5 });

firebase.initializeApp({
	databaseURL: 'https://hacker-news.firebaseio.com'
});

const API = firebase.database().ref('/v0');

const once = child => new Promise((resolve, reject) => {
	API.child(child).once('value', snap => resolve(snap.val()));
});

const item = id => once(`item/${id}`);

const watch = child => {};

export default {
	getType(type) {
		return once(`${ type.substr(1) || 'top' }stories`);
	},

	getItem(id) {
		// return item(id);
		return queue.add(() => item(id));
	},

	getItems(ids) {
		return Promise.all(ids.map(id => item(id)));
	}
}