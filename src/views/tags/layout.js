import { h } from 'preact';
// import Header from './header';

export default function (props) {
	return (
		<div id="app">
			<main id="content">
				{ props.children }
			</main>
		</div>
	);
}
