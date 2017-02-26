import { h, Component } from 'preact';
import Header from 'preact-scroll-header';
import { on, off } from '../share';
import Sidebar from './sidebar';

const check = () => window.innerWidth <= 481;

export default class extends Component {
	state = {
		doOpen: false,
		isDevice: check()
	}

	open = e => {
		e.stopPropagation(); // prevent instant close()
		this.setState({ doOpen: true });
	}

	close = e => {
		if (e.target.id === 'side') return;
		this.setState({ doOpen: false });
	}

	componentDidMount() {
		on('resize', () => this.setState({ isDevice: check() }));
	}

	shouldComponentUpdate(_, state) {
		const now = this.state;
		return state.isDevice !== now.isDevice || state.doOpen !== now.doOpen;
	}

	componentWillUpdate(props, state) {
		// update `isOpen`
		props.isOpen = state.isDevice && state.doOpen;
		// attach/detach handler
		(props.isOpen ? on : off)('click touch', this.close);
	}

	// componentDidUpdate(props) {
	// 	// console.log(props.isOpen ? 'on' : 'off');
	// 	// (props.isOpen ? on : off).call(null, 'click touch', this.close);
	// 	if (props.isOpen) {
	// 		console.log('i am open');
	// 		on('click touch', this.close);
	// 	} else {
	// 		console.log('i am closed');
	// 		off('click touch', this.close);
	// 	}
	// }

	render(props, { isDevice, doOpen }) {
		return (
			<div id="app" className={{ overlay: props.isOpen }}>
				<Header id="top">
					{ isDevice && <button onClick={ this.open }>TOGGLE</button> }
				</Header>

				<main id="content">{ props.children }</main>

				{ isDevice && <Sidebar active={ props.isOpen } /> }
			</div>
		);
	}
}
