import { h, Component } from 'preact';
import { getComments } from '../store';
import { timeAgo } from '../util';

const plural = n => n === 1 ? 'reply' : 'replies';

export default class Comment extends Component {
	state = { kids:[], loading:false, open:false }

	toggle = () => (this.state.open ? this.setState({ open:false }) : this.getKids())

	setKids = kids => this.setState({ kids, loading:false, open:true })

	getKids() {
		this.setState({ loading:true });
		getComments(this.props.data.kids).then(this.setKids);
	}

	componentWillMount() {
		const kids = this.props.data.kids || [];
		this.setState({ kids });
	}

	shouldComponentUpdate(_, state) {
		const now = this.state;
		return state.loading !== now.loading || state.open !== now.open || state.kids.length !== now.kids.length;
	}

	render(props, state) {
		const d = props.data || {};
		const len = state.kids.length;

		const footer = [
			<footer onClick={ this.toggle }>
				{ len } { plural(len) }
				<span>{ len && state.loading && 'Loading...' }</span>
			</footer>,
			state.open && <ul>{ state.kids.map(obj => <Comment data={obj} />) }</ul>
		];

		return (
			<li>
				<header>
					<span><a href={ `/user/${ d.by }` }>{ d.by }</a></span>
					<time datetime={ d.time }>{ timeAgo(d.time) }</time>
				</header>
				<div className="text" dangerouslySetInnerHTML={{__html: d.text}} />
				{ (len > 0) && footer }
			</li>
		);
	}
}
