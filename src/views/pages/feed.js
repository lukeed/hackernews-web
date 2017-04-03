import { h, Component } from 'preact';
import Item from '../tags/item';

export default class Feed extends Component {
	state = { items: [] }

	componentWillMount() {
		const items = window.DATA || [];
		window.DATA = false;
		this.setState({ items });
	}

	componentWillUnmount() {
		console.log('remove firebase listener for', this.props.type);
	}

	render(props, state) {
		return (
			<div className="feed">
				{ state.items.map(obj => <Item key={ obj.id } data={ obj } />) }
			</div>
		)
	}
}
