import { h, Component } from 'preact';
import API from '../store';

export default class extends Component {
	state = {
		data: {},
		loading: true
	}

	getItem = () => {
		this.setState({ loading: true });
		API.getItem(this.props.id).then(data => this.setState({ data, loading:false }));
	}

	componentWillMount() {
		this.getItem();
	}

	componentWillReceiveProps() {
		this.getItem();
	}

	shouldComponentUpdate(props, state) {
		const now = this.state;
		return this.props.id !== props.id
			|| now.loading !== state.loading
			|| now.data.id !== state.data.id;
	}

	render(props, state) {
		return (
			<div className="feed__item">
				item #{ props.id }: loading? { state.loading ? 'yes' : 'no' }
			</div>
		)
	}
}
