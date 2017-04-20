import { h } from 'preact';
import { timeAgo } from '../util';

export default props => (
	<div className="card page--user">
		<h1>User: { props.name }</h1>
	</div>
);
