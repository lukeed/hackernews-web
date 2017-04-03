const { join } = require('path');
const compression = require('compression');
const express = require('express');

const maxAge = 31536000; // 1yr
const PORT = process.env.PORT || 3000;
const pubDir = join(__dirname, 'static');

express()
	.disable('x-powered-by')
	.use(compression({ threshold: 0 }))
	.use('/static', express.static(pubDir, { maxAge }))
	.use('/sw.js', express.static(`${pubDir}/sw.js`, { setHeaders }))
	.use(require('./routes'))
	.get('*', (_, res) => {
		res.sendFile(`${pubDir}/index.html`);
	})
	.listen(PORT, err => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${PORT}`)
	});

// for service-worker: don't cache!
function setHeaders(res) {
	res.setHeader('Cache-Control', 'private, no-cache');
}
