import { h, Component } from 'preact';
import Sidebar from './sidebar';
import Header from './header';
import { on } from '../shared';

const check = () => window.innerWidth <= 481;

export default class extends Component {
	state = { isDevice: check() }

	componentDidMount() {
		on('resize', () => this.setState({ isDevice: check() }));
	}

	shouldComponentUpdate(_, state) {
		return state.isDevice !== this.state.isDevice;
	}

	render(props, state) {
		const bool = state.isDevice;

		const content = [
			<Header mobile={ bool } />,
			<main id="content">{ props.children }</main>
		];

		return (
			<div id="app">
				{ bool ? <Sidebar children={ content } /> : content }
			</div>
		);
	}
}
