import { h, Component } from 'preact';
import { on, off } from '../shared';

export default class extends Component {
	state = { isOpen: false }

	onClick = e => {
		console.log('heard', e.target);
	}

	componentDidMount() {
		on('click touch', this.onClick);
	}

	componentWillUnmount() {
		off('click touch', this.onClick);
	}

	render(_, state) {
		console.log('sidebar render');
		return <aside>sidebar</aside>
	}
}
