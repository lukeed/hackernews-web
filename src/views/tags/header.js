import { h } from 'preact';
import Header from 'preact-scroll-header';

const links = [
	{name: 'Top', path: '/'},
	{name: 'New', path: '/new'},
	{name: 'Show', path: '/show'},
	{name: 'Ask', path: '/ask'},
	{name: 'Jobs', path: '/jobs'}
];

export default props => {
	const cur = '/' + props.type.replace('top', '');
	return (
		<Header id="top" listenTo={ document.body }>
			<nav>
				{ links.map(o => (
					<a className={{ active: cur === o.path }} href={ o.path }>{ o.name }</a>
				)) }
			</nav>
		</Header>
	);
}
