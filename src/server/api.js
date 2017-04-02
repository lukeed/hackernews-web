const { Router } = require('express');
const LRU = require('lru-cache');
const DB = require('./db');

const per = 30; // inital # per type
const maxAge = 1000 * 60 * 60; // 1 hour
const types = ['top', 'new', 'ask', 'show', 'job'];

// Prepare caches
const lists = new LRU({ maxAge });
const users = new LRU({ maxAge, max: 100 });
const items = new LRU({ maxAge, max: per * types.length });

// Overly simple response handler
const send = (res, data) => data ? res.json({ data }) : res.status(404).json({ error: 'Not found!' });
const getChild = async key => await DB.child(key).once('value').then(s => s.val());
const cacheItem = id => addCache(`/item/${id}`, items); // hoist for `forEach`

async function addCache(key, cache) {
	const data = await getChild(key);
	data && cache.set(key, data);
	return data;
}

types.forEach(type => {
	const ref = DB.child(`${type}stories`);

	// Grab first X items per list; only @ startup!
	ref.once('value', snap => snap.val().slice(0, per).forEach(cacheItem));

	// Set up list watchers; continuously updates
	ref.on('value', snap => lists.set(type, snap.val()));
});

const app = Router();

app
	.get('/:type', (req, res) => {
		return send(res, lists.get(req.params.type));
	})

	.get('/item/:id', async (req, res) => {
		const key = req.url;
		const data = items.get(key) || await addCache(key, items);
		return send(res, data);
	})

	.get('/user/:name', async (req, res) => {
		const { name } = req.params;
		const data = users.get(name) || await addCache(req.url, users);
		return send(res, data);
	})

module.exports = app;
