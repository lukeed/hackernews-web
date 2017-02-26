import { h } from 'preact'
import { Router } from 'preact-router';
import Header from './tags/header';
import * as pages from './pages';

// track pages on route change
const onChange = obj => window.ga && ga('send', 'pageview', obj.url);

export default (
	<div id="app">
		<Header />
		<main id="content">
			<Router onChange={ onChange }>
				<pages.index path="/" feed="top" />
				<pages.index path="/:feed" />
				<pages.error default />
			</Router>
		</main>
	</div>
);
