import { h, Component } from 'preact';
import Header from 'preact-scroll-header';
import Sidebar from './sidebar';
import { on } from '../share';

const check = () => window.innerWidth <= 481;

export default class extends Component {
	state = {
		doOpen: false,
		isDevice: check()
	}

	toggle = () => this.setState({ doOpen: !this.state.doOpen })

	componentDidMount() {
		on('resize', () => this.setState({ isDevice: check() }));
	}

	shouldComponentUpdate(_, state) {
		const now = this.state;
		return state.isDevice !== now.isDevice || state.doOpen !== now.doOpen;
	}

	render(props, { isDevice, doOpen }) {
		const isOpen = isDevice && doOpen;
		console.error('LAYOUT RENDER', doOpen);
		return (
			<div id="app" className={{ overlay: isOpen }}>
				<Header id="top">
					{ isDevice && <button onClick={ this.toggle }>TOGGLE</button> }
				</Header>

				<main id="content">{ props.children }</main>
				{ isDevice && <Sidebar active={ isOpen } /> }
			</div>
		);
	}
}
