// import { h, Component } from 'preact'
import { h } from 'preact'
import { Router } from 'preact-router';
// import Progress from 'preact-progress';
// import API, { queue } from './store';
import Header from './tags/header';
import * as pages from './pages';

// const loadChange = (ctx, val) => {
// 	console.log(`${val}% complete`);
// 	ctx.base.firstChild.style.opacity = 1;
// }
// const loadComplete = ctx => {
// 	console.log('DONE');
// 	ctx.base.firstChild.style.opacity = 0;
// };

const onRoute = obj => window.ga && ga('send', 'pageview', obj.url);

export default (
	<div id="app">
		<Header />
		<main id="content">
			<Router onChange={ onRoute }>
				<pages.feed path="/" type="top" />
				<pages.feed path="/:type" />
				<pages.item path="/item/:id" />
				<pages.error default />
			</Router>
		</main>
	</div>
);

/*
export default class extends Component {
	state = {
		// items: [],
		// percent: 0,
		url: location.pathname
	}

	onRoute = ({ url }) => {
		window.ga && ga('send', 'pageview', url);
		console.log('inside onRoute', performance.now());
		// this.setState({ url });
		// queue.clear();
		// this.setState({ items:[], percent:0, url });
		// API.getType(url).then(items => this.setState({ items, percent:100 }));
	}

	// componentWillMount() {
		// fetch first items; ~10ms sooner
		// API.getType(url).then(items => this.setState({ items, percent:100 }));
		// console.log('root will mount', this.state.url, performance.now());
	// }

	// shouldComponentUpdate(_, state) {
		// const now = this.state;
		// const bool = now.url !== state.url;
			// || now.items.length !== state.items.length;
		// console.log('root should update?', bool);
		// return this.state.url !== state.url;
	// }

	render(_, state) {
		console.log('root mount', performance.now());
						// <pages.feed path="/" type="top" items={ state.items } />
						// <pages.feed path="/:type" items={ state.items } />
		return (
			<div id="app">
				<Header url={ state.url } />
				<main id="content">
					<Router onChange={ this.onRoute }>
						<pages.feed path="/" type="top" />
						<pages.feed path="/:type" />
						<pages.item path="/item/:id" />
						<pages.error default />
					</Router>
				</main>
			</div>
		);
	}
}
*/
