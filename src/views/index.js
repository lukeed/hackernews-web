import { h, Component } from 'preact'
import { Router } from 'preact-router';
import Header from './tags/header';
import * as pages from './pages';
import API from './store';

const type = str => str.substr(1) || 'top';

export default class extends Component {
	state = {
		list: [],
		type: type(location.pathname)
	}

	onRoute = obj => {
		window.ga && ga('send', 'pageview', obj.url);
		this.setState({ type: type(obj.url) });
	}

	getItems = str => {
		API.getType(str)
	}

	componentWillMount() {
		// firebase listener
		console.log('root will mount; fetch type: ', this.state.type);
		API.getType(this.state.type).then(list => this.setState({ list }));
	}

	// componentDidMount() {
	// 	firebase listener ?
	// }

	shouldComponentUpdate(_, state) {
		const now = this.state;
		return now.type !== state.type
			|| now.list.length !== state.list.length;
	}

	componentWillUpdate(_, state) {
		console.log('root will update');
	}

	render(_, state) {
		return (
			<div id="app">
				<Header type={ state.type } />
				<main id="content">
					<Router onChange={ this.onRoute }>
						<pages.feed path="/:type" items={ state.list } />
						<pages.item path="/item/:id" />
						<pages.error default />
					</Router>
				</main>
			</div>
		);
	}
}
