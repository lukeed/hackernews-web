import { h, Component } from 'preact';
import { getPage } from '../store';
import Pager from '../tags/pager';
import Item from '../tags/item';

export default class Feed extends Component {
	state = { items:[], pages:1 }

	watch() {
		console.log(`start firebase watcher for ${this.props.type}`);
	}

	unwatch() {
		console.log(`stop firebase watcher for ${this.props.type}`);
	}

	setData = obj => this.setState({
		items: obj.items || [],
		pages: obj.total ? Math.ceil(obj.total / 30) : 1
	})

	componentWillMount() {
		const data = window.DATA || {};
		window.DATA = false;
		this.setData(data);
	}

	componentDidMount() {
		this.watch();
	}

	componentWillUpdate({ type, page }) {
		if (this.props.type !== type || this.props.page !== page) {
			console.log('UPDATED THE PROPS.TYPE OR PAGE');
			getPage(type, page).then(this.setData);
		}
	}

	componentDidUpdate({ type }) {
		(this.props.type !== type) && this.watch();
		console.log('scroll `doc.body` to top');
	}

	componentWillUnmount() {
		this.unwatch();
	}

	render(props, state) {
		return (
			<div className="feed">
				<Pager type={ props.type } curr={ +props.page || 1 } total={ state.pages } />
				{ state.items.map(obj => <Item key={ obj.id } data={ obj } />) }
			</div>
		)
	}
}
