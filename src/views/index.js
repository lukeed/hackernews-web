import { h } from 'preact'
import { Router } from 'preact-router';
import Layout from './tags/layout';
import * as pages from './pages';

// track pages on route change
const onChange = obj => window.ga && ga('send', 'pageview', obj.url);

export default (
	<Layout>
		<Router onChange={ onChange }>
			<pages.index path="/" />
			<pages.error default />
		</Router>
	</Layout>
);
