import { h } from 'preact';
import Header from 'preact-scroll-header';

const links = [
	{name: 'Top', path: '/'},
	{name: 'New', path: '/new'},
	{name: 'Show', path: '/show'},
	{name: 'Ask', path: '/ask'},
	{name: 'Jobs', path: '/job'}
];

export default props => (
	<Header id="top" listenTo={ document.body }>
		<nav>
			{ links.map(o => (
				<a className={{ active: props.url === o.path }} href={ o.path }>{ o.name }</a>
			)) }
		</nav>
	</Header>
);
