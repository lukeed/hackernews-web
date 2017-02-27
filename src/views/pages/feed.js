import { h } from 'preact';

export default props => {
	console.log('feed got', props);
	return (
		<div>
			<p>{ props.type }</p>
			{ props.items.map(el => <li>{ el }</li>) }
		</div>
	);
}
