export function hostname(url) {
	const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
	const parts = host.split('.').slice(-3);
	(parts[0] === 'www') && parts.shift();
	return parts.join('.');
}

export function pluralize(time, label) {
	return (time === 1) ? (time + label) : (time + label + 's');
}

export function timeAgo(time) {
	const between = Date.now() / 1000 - Number(time);
	if (between < 3600) return pluralize(~~(between / 60), ' minute');
	if (between < 86400) return pluralize(~~(between / 3600), ' hour');
	return pluralize(~~(between / 86400), ' day');
}
