import { h, Component } from 'preact'
import { Router } from 'preact-router';
import Header from './tags/header';
import * as pages from './pages';

const getType = () => location.pathname.split('/')[1];

export default class App extends Component {
	state = { type:getType(), percent:0 }

	onRoute = ({ url }) => {
		// window.ga && ga('send', 'pageview', url);
		this.setState({ type:getType() });
	}

	shouldComponentUpdate(_, state) {
		const now = this.state;
		return now.type !== state.type || now.percent !== state.percent;
	}

	render(_, state) {
		return (
			<div id="app">
				<Header curr={ '/' + state.type } />
				<main id="content">
					<Router onChange={ this.onRoute }>
						<pages.item path="/item/:id" />
						<pages.feed path="/:type/:page?" />
						<pages.user path="/user/:name" />
						<pages.error default />
					</Router>
				</main>
			</div>
		);
	}
}
