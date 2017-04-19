import { h } from 'preact';
import { Link } from 'preact-router';

const GoTo = props => props.cond
	? <Link href={ props.href }>{ props.text }</Link>
	: <a className="disabled" disabled>{ props.text }</a>

export default props => {
	const now = props.curr;
	const base = `/${props.type}`;
	const max = props.total;
	return (
		<nav className="pager">
			<GoTo href={ `${base}/${now-1}` } text="&lt; prev" cond={ now > 1 } />
			<span>{ now }/{ max }</span>
			<GoTo href={ `${base}/${now+1}` } text="next &gt;" cond={ now < max } />
		</nav>
	);
}
