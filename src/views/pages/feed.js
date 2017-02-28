import { h } from 'preact';
import Item from '../tags/item';

export default props => (
	<div className="feed">
		{ props.items.map(id => <Item id={ id } key={ id } />) }
	</div>
);
