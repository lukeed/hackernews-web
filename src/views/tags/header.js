import { h } from 'preact';
import Header from 'preact-scroll-header';

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
	<Header id="top">
		<ul>{ links.map(Item) }</ul>
	</Header>
);
