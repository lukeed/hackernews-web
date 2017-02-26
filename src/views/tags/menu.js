import { h } from 'preact';

const Item = props => (
	<li className={{ active: location.pathname === props.path }}>
		<a href={ props.path }>{ props.name }</a>
	</li>
);

const links = [
	{name: 'Top', path: '/'},
	{name: 'New', path: '/new'},
	{name: 'Show', path: '/show'},
	{name: 'Ask', path: '/ask'},
	{name: 'Jobs', path: '/jobs'}
];

export default () => (
	<ul>{ links.map(Item) }</ul>
);
