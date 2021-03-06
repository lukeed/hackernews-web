import { h, Component } from 'preact'
import { Router, route } from 'preact-router';
import Header from './tags/header';
import * as pages from './pages';

const getType = () => location.pathname.split('/')[1];

export default class App extends Component {
	state = { type:getType() }

	onRoute = obj => {
		(obj.url === '/') ? route('/top') : this.setState({ type:getType() });
	}

	shouldComponentUpdate(_, state) {
		return this.state.type !== state.type;
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
