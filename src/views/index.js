import { h } from 'preact'
import { Router } from 'preact-router';
import Sidebar from './tags/sidebar';
import Layout from './tags/layout';
import * as pages from './pages';

// track pages on route change
const onChange = obj => window.ga && ga('send', 'pageview', obj.url);

export default (
	<Layout nav={ <Sidebar /> }>
		<Router onChange={ onChange }>
			<pages.index path="/" />
			<pages.error default />
		</Router>
	</Layout>
);
