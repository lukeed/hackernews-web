import { h } from 'preact';

function hostname(url) {
	const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
	const parts = host.split('.').slice(-3);
	(parts[0] === 'www') && parts.shift();
	return parts.join('.');
}

const pluralize = (time, label) => (time === 1) ? (time + label) : (time + label + 's');

function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  }
  if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  }
  return pluralize(~~(between / 86400), ' day');
}

export default props => {
	const d = props.data;
	return (
		<div className="feed__item">
			<i>{ d.score }</i>
			<header>
				<a href={ d.url }>{ d.title }</a>
				{ d.url && <small>via { hostname(d.url) }</small> }
			</header>
			<footer>
				<span>by <a href={ `/user/${ d.by }` }>{ d.by }</a></span>
				<time datetime={ d.time }>{ timeAgo(d.time) }</time>
				{ d.hasOwnProperty('descendants') && <a href={ `/item/${ d.id }` } className="comments">{ d.descendants } comments</a> }
			</footer>
		</div>
	);
}
