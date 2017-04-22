const { join } = require('path');
const compression = require('compression');
const favicon = require('serve-favicon');
const express = require('express');

const PORT = process.env.PORT || 3000;
const pubDir = join(__dirname, 'static');

express()
	.disable('x-powered-by')
	.use(compression({ threshold: 0 }))
	.use(favicon(`${pubDir}/favicon.ico`))
	.use('/static', express.static(pubDir, { setHeaders }))
	.use('/sw.js', express.static(`${pubDir}/sw.js`, { setHeaders:noCache }))
	.use(require('./routes'))
	.listen(PORT, err => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${PORT}`)
	});

// for service-worker: don't cache!
function noCache(res) {
	res.setHeader('Cache-Control', 'private, no-cache');
}

function setHeaders(res) {
	res.setHeader('Cache-Control', 'public,max-age=31536000,immutable');
}
