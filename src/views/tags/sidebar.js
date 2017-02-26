import { h } from 'preact';
import Menu from './menu';

export default props => (
	<aside id="side" className={{ active: props.active }}>
		<Menu />
	</aside>
)
