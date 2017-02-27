import { h, Component } from 'preact';

export default props => {
	console.log('feed got', performance.now());
	return (
		<div>
			<p>{ props.type }</p>
			{ props.items.map(el => <li>{ el }</li>) }
		</div>
	);
}

// export default class extends Component {
// 	componentWillMount() {
// 		console.log('--- feed Will mount', performance.now());
// 	}

// 	shouldComponentUpdate(props, state) {
// 		return this.props.type !== props.type;
// 	}

// 	componentWillUpdate(nextProps, nextState) {
// 		console.log('--- feed will update');
// 	}

// 	render(props, state) {
// 		console.log('feed render', performance.now());
// 		return (
// 			<div>
// 				<p>{ props.type }</p>
// 			</div>
// 		);
// 	}
// }
