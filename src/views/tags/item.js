import { h, Component } from 'preact';
import API from '../store';

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

export default class extends Component {
	state = {
		data: {},
		loading: true
	}

	getItem = () => {
		this.setState({ loading: true });
		API.getItem(this.props.id).then(data => this.setState({ data, loading:false }));
	}

	componentWillMount() {
		this.getItem();
	}

	componentWillReceiveProps() {
		this.getItem();
	}

	shouldComponentUpdate(props, state) {
		const now = this.state;
		return this.props.id !== props.id
			|| now.loading !== state.loading
			|| now.data.id !== state.data.id;
	}

	render(_, state) {
		const d = state.data;
		return (
			<div className="feed__item">
				{
					state.loading ? 'loading' : [
						<i>{ d.score }</i>,
						<header>
							<a href={ d.url }>{ d.title }</a>
							{ d.url && <small>via { hostname(d.url) }</small> }
						</header>,
						<footer>
							<span>by <a href="#">{ d.by }</a></span>
							<time datetime={ d.time }>{ timeAgo(d.time) }</time>
							{ d.hasOwnProperty('descendants') && <a href="#" className="comments">{ d.descendants } comments</a> }
						</footer>
					]
				}
			</div>
		)
	}
}
