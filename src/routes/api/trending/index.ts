import * as api from '$lib/api.js';

export async function get({ url }) {
	const query = url.searchParams;
	const languages = query.get('lang') || '';
	const categories = query.get('cat') || '';

	const data = await api.get(`podcasts/trending?lang=${languages}&cat=${categories}`);

	return {
		body: data
	};
}
