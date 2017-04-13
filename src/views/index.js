import { h, Component } from 'preact'
import { Router } from 'preact-router';
import Progress from 'preact-progress';
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

const getType = () => location.pathname.split('/')[1];

export default class App extends Component {
	state = { type:getType(), percent:0 }

	onRoute = ({ url }) => {
		window.ga && ga('send', 'pageview', url);
		this.setState({ type:getType() });
	}

	shouldComponentUpdate(_, state) {
		const now = this.state;
		const bool = now.type !== state.type || now.percent !== state.percent;
		console.log(`app update? ${bool}`);
		return bool;
	}

	render(_, state) {
		return (
			<div id="app">
				<Header curr={ '/' + state.type } />
				<main id="content">
					<Router onChange={ this.onRoute }>
						<pages.item path="/item/:id" />
						<pages.feed path="/:type/:page?" />
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
