import { h } from 'preact';

const click = () => console.log('clicked head');

export default () => <header onClick={ click }>head</header>
