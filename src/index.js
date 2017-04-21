import { h, render } from 'preact';
import App from './views';
import './index.sass';

render(<App />, document.body, document.body.firstElementChild);

if (process.env.NODE_ENV === 'production') {
	// cache all assets if browser supports serviceworker
	if ('serviceWorker' in navigator && location.protocol === 'https:') {
		navigator.serviceWorker.register('/sw.js');
	}
}
