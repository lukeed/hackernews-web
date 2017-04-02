const firebase = require('firebase');

firebase.initializeApp({
	databaseURL: 'https://hacker-news.firebaseio.com'
});

module.exports = firebase.database().ref('v0');
