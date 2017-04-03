import { h, Component } from 'preact';
import { getPage } from '../store';
import Item from '../tags/item';

export default class Feed extends Component {
	state = { items:[], page:1 }

	watch() {
		console.log(`start firebase watcher for ${this.props.type}`);
	}

	unwatch() {
		console.log(`stop firebase watcher for ${this.props.type}`);
	}

	componentWillMount() {
		const items = window.DATA || [];
		window.DATA = false;
		this.setState({ items });
	}

	componentDidMount() {
		this.watch();
	}

	componentWillReceiveProps(next) {
		if (next.type !== this.props.type) {
			this.setState({ page:1 });
		}
	}

	componentWillUpdate({ type }, { page }) {
		if (this.props.type !== type || this.state.page !== page) {
			console.log('UPDATED THE PROPS.TYPE OR PAGE');
			getPage(type, page).then(items => this.setState({ items }, this.watch));
		}
	}

	componentWillUnmount() {
		this.unwatch();
	}

	render(_, state) {
		return (
			<div className="feed">
				{ state.items.map(obj => <Item key={ obj.id } data={ obj } />) }
			</div>
		)
	}
}
