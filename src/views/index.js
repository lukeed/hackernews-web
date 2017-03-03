import { h, Component } from 'preact'
import { Router } from 'preact-router';
import Progress from 'preact-progress';
import API, { queue } from './store';
import Header from './tags/header';
import * as pages from './pages';

const loadChange = (ctx, val) => {
	console.log(`${val}% complete`);
	ctx.base.firstChild.style.opacity = 1;
}
const loadComplete = ctx => {
	console.log('DONE');
	ctx.base.firstChild.style.opacity = 0;
};

export default class extends Component {
	state = {
		items: [],
		percent: 0,
		url: location.pathname
	}

	onRoute = ({ url }) => {
		window.ga && ga('send', 'pageview', url);
		queue.clear();
		this.setState({ items:[], percent:0, url });
		API.getType(url).then(items => this.setState({ items, percent:100 }));
	}

	componentWillMount() {
		console.log('root will mount', performance.now());
	}

	shouldComponentUpdate(_, state) {
		const now = this.state;
		const bool = now.url !== state.url
			|| now.percent !== state.percent
			|| now.items.length !== state.items.length;
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

				<Progress id="loader"
					value={ state.percent } height="2px" color="#fff"
					onChange={ loadChange } onComplete={ loadComplete }
				/>
			</div>
		);
	}
}
