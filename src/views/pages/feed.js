import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { getPage } from '../store';
import Item from '../tags/item';

export default class Feed extends Component {
	state = { items:[] }

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

	componentWillUpdate({ type, page }) {
		if (this.props.type !== type || this.props.page !== page) {
			console.log('UPDATED THE PROPS.TYPE OR PAGE');
			getPage(type, page).then(items => this.setState({ items }));
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
		const page = +props.page || 1;
		return (
			<div className="feed">
				<nav>
					<Link href={ `/${props.type}/${page-1}` } class="prev">&lt; prev</Link>
					<span>{ page }/25</span>
					<Link href={ `/${props.type}/${page+1}` } class="prev">next &gt;</Link>
				</nav>
				{ state.items.map(obj => <Item key={ obj.id } data={ obj } />) }
			</div>
		)
	}
}
