import { h, Component } from 'preact';
import { on, off } from '../share';

export default class extends Component {
	state = { isOpen: false }

	onClick = e => {
		if (e.target === this.base) {
			console.log('was SELF');
			return;
		}
		this.props.doToggle();
	}

	componentDidMount() {
		on('click touch', this.onClick);
	}

	componentWillReceiveProps(props) {
		console.log('sidebar will receive', props);
		console.log('sidebar state', this.state);
		// this.setState({ isOpen: props.active });
	}

	componentWillUnmount() {
		off('click touch', this.onClick);
	}

	render(_, state) {
		console.log('sidebar render');
		return (
			<aside id="side">sidebar</aside>
		);
	}
}
