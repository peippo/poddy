import crypto from 'crypto';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET = import.meta.env.VITE_API_SECRET;

const getHeaders = () => {
	const authDate = Math.floor(Date.now() / 1000);
	const authString = `${API_KEY}${API_SECRET}${authDate}`;
	const authHeader = crypto.createHash('sha1').update(authString).digest('hex');

	return {
		Authorization: authHeader,
		'X-Auth-Date': authDate.toString(),
		'X-Auth-Key': API_KEY,
		'User-Agent': 'PodcastBrowser/1.0',
		'Content-Type': 'application/json'
	};
};

async function send({ method, path }) {
	const options = { method, headers: getHeaders() };

	return fetch(`${API_BASE_URL}/${path}`, options)
		.then((res) => res.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export function get(path) {
	return send({ method: 'GET', path });
}
