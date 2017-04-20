import { h, Component } from 'preact';
import { getItem, getComments } from '../store';
import Comment from '../tags/comment';
import Item from '../tags/item';

export default class extends Component {
	state = { data:{}, kids:[], loading:true }

	setData = data => {
		this.setState({ data });
		getComments(data.kids).then(kids => this.setState({ kids, loading:false }));
	}

	getData(id) {
		getItem(id || this.props.id).then(this.setData);
	}

	componentWillMount() {
		const data = window.DATA;
		window.DATA = void 0;
		(data === void 0) ? this.getData() : this.setData(data);
	}

	shouldComponentUpdate(_, state) {
		const now = this.state;
		return state.loading !== now.loading || state.data.id !== now.data.id || state.kids.length !== now.kids.length;
	}

	render(_, state) {
		const d = state.data;
		const len = d.descendants;

		return (
			<div className="page--item">
				<Item data={ d } />

				<div className="card comments__count">
					{ len } comments
					<span>{ len && state.loading && 'Loading...' }</span>
				</div>

				<ul className="card comments">
					{ state.kids.map(obj => <Comment data={obj} />) }
				</ul>
			</div>
		);
	}
}
