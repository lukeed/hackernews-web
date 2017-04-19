import { h, Component } from 'preact';
import { getItem } from '../store';
import Item from '../tags/item';

export default class extends Component {
	state = { data:{}, kids:[] }

	setData = obj => this.setState({
		data: obj || {},
		kids: obj.kids || []
	})

	getData(id) {
		getItem(id || this.props.id).then(this.setData);
	}

	componentWillMount() {
		const data = window.DATA;
		window.DATA = void 0;
		(data === void 0) ? this.getData() : this.setData(data);
	}

	componentWillUpdate(props) {
		if (this.props.id !== props.id) {
			console.log('ITEM--> UPDATED THE PROPS.ID');
			// getPage(type, page).then(this.setData);
		}
	}

	render(props, state) {
		return (
			<div className="page--item">
				<Item data={ state.data } />
			</div>
		);
	}
}
