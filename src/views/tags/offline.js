import { h, Component } from 'preact';

// @TODO watch `nav.onLine` changes
export default class Offline extends Component {
	state = { show:false, online:navigator.onLine }

	check = () => {
		const online = navigator.onLine;
		this.setState({ online, show:!online });
	}

	componentDidMount() {
		(this.state.online === false) && setTimeout(() => this.setState({ show:true }), 200);
	}

	shouldComponentUpdate(_, state) {
		return this.state.show !== state.show || this.state.online !== state.online;
	}

	render(_, { show, online }) {
		return online ? '' : (
			<div className={{ toast:true, show }}>
				No connection <button onClick={ this.check }>Retry</button>
			</div>
		);
	}
}
