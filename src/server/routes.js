const { join } = require('path');
const { readFileSync } = require('fs');
const { Router } = require('express');
const LRU = require('lru-cache');
const DB = require('./db');

const PER = 30; // inital # per type
const TITLE = 'Hacker News';
const maxAge = 1000 * 60 * 60; // 1 hour
const types = ['top', 'new', 'ask', 'show', 'job'];

const pubDir = join(__dirname, 'static');
const template = readFileSync(`${pubDir}/index.html`, 'utf8');
const contentRgx = new RegExp('{{__content__}}', 'g');
const titleRgx = new RegExp('{{__title__}}', 'g');

// Prepare caches
const lists = new LRU({ maxAge });
const users = new LRU({ maxAge, max: 100 });
const items = new LRU({ maxAge, max: PER * types.length });

// Overly simple response handlers
const send = (res, data) => data ? res.json({ data }) : res.status(404).json({ error: 'Not found!' });
const sendPage = (res, title, content) => res.send(template.replace(titleRgx, title).replace(contentRgx, JSON.stringify(content && content)));

const getChild = async key => await DB.child(key).once('value').then(s => s.val());

const getUser = async name => users.get(name) || await addCache(name, users);
const getItem = async id => (id = `/item/${id}`) && (items.get(id) || await addCache(id, items));
const cacheItem = id => addCache(`/item/${id}`, items); // hoist for `forEach`

async function addCache(key, cache) {
	const data = await getChild(key);
	data && cache.set(key, data);
	return data;
}

function getPage(type, page) {
	const end = (+page || 1) * PER;
	const data = lists.get(type).slice(end - PER, end);
	return Promise.all(data.map(getItem));
}

types.forEach(type => {
	const ref = DB.child(`${type}stories`);
	// Grab first X items per list; only @ startup!
	ref.once('value', snap => snap.val().slice(0, PER).forEach(cacheItem));
	// Set up list watchers; continuously updates
	ref.on('value', snap => lists.set(type, snap.val()));
});

const app = Router();

app
	.get('/api/:type', (req, res) => send(res, lists.get(req.params.type)))
	.get('/api/item/:id', async (req, res) => send(res, await getItem(req.params.id)))
	.get('/api/user/:name', async (req, res) => send(res, await getUser(req.params.name)))

	/**
	 * Front-end Routes
	 */
	.get('/user/:name', async (req, res) => {
		send(res, await getUser(req.params.name));
	})
	.get('/item/:id', async (req, res) => {
		send(res, await getItem(req.params.id));
	})
	.get('/:type', async (req, res) => {
		sendPage(res, TITLE, await getPage(req.params.type, req.query.page));
	})
	.get('/', (_, res) => res.redirect('/top'));

module.exports = app;
