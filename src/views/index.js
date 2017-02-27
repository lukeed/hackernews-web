import { h, Component } from 'preact'
import { Router } from 'preact-router';
import Header from './tags/header';
import * as pages from './pages';
import API from './store';

export default class extends Component {
	state = {
		items: [],
		url: location.pathname
	}

	onRoute = ({ url }) => {
		window.ga && ga('send', 'pageview', url);
		this.setState({ items: [], url });
		API.getType(url).then(items => this.setState({ items }));
	}

	componentWillMount() {
		console.log('root will mount', performance.now());
	}

	shouldComponentUpdate(_, state) {
		const now = this.state;
		const bool = now.url !== state.url || now.items.length !== state.items.length;
		console.log('root should update?', bool);
		return bool;
	}

	render(_, state) {
		console.log('root mount', performance.now());
		return (
			<div id="app">
				<Header url={ state.url } />
				<main id="content">
					<Router onChange={ this.onRoute }>
						<pages.feed path="/" type="top" items={ state.items } />
						<pages.feed path="/:type" items={ state.items } />
						<pages.item path="/item/:id" />
						<pages.error default />
					</Router>
				</main>
			</div>
		);
	}
}
