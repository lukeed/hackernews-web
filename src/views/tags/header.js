import { h } from 'preact';
import { Link } from 'preact-router';
import Header from 'preact-scroll-header';

const links = [
	{name: 'Top', path: '/top'},
	{name: 'New', path: '/new'},
	{name: 'Show', path: '/show'},
	{name: 'Ask', path: '/ask'},
	{name: 'Jobs', path: '/job'}
];

export default props => {
	console.log('inside header render');
	return (
		<Header id="top" listenTo={ document.body }>
			<nav>
				{ links.map(o => (
					<Link className={{ active: props.url === o.path }} href={ o.path } onClick={ this.update }>{ o.name }</Link>
				)) }
			</nav>
		</Header>
	);
}
