import { h, Component } from 'preact';
import Header from 'preact-scroll-header';

const links = [
	{name: 'Top', path: '/'},
	{name: 'New', path: '/new'},
	{name: 'Show', path: '/show'},
	{name: 'Ask', path: '/ask'},
	{name: 'Jobs', path: '/job'}
];

export default class extends Component {
	state = {url: location.pathname}

	// listen to new path
	// componentDidMount() {}

	update = e => this.setState({ url: e.target.getAttribute('href') })

	shouldComponentUpdate(_, state) {
		return this.state.url !== state.url;
	}

	render(_, state) {
		return (
			<Header id="top" listenTo={ document.body }>
				<nav>
					{ links.map(o => (
						<a className={{ active: state.url === o.path }} href={ o.path } onClick={ this.update }>{ o.name }</a>
					)) }
				</nav>
			</Header>
		);
	}
}
