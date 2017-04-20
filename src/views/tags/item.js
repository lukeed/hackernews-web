import { h } from 'preact';
import { hostname, timeAgo } from '../util';

export default props => {
	const d = props.data;
	return (
		<div className="item">
			<i>{ d.score }</i>
			<header>
				<a href={ d.url }>{ d.title }</a>
				{ d.url && <small>via { hostname(d.url) }</small> }
			</header>
			<footer>
				<div className="score">{ d.score } points</div>
				<span>by <a href={ `/user/${ d.by }` }>{ d.by }</a></span>
				<time datetime={ d.time }>{ timeAgo(d.time) }</time>
				{ d.hasOwnProperty('descendants') && <a href={ `/item/${ d.id }` } className="to-item">{ d.descendants } comments</a> }
			</footer>
		</div>
	);
}
