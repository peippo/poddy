import * as api from '$lib/api.js';

export async function get({ url }) {
	const query = url.searchParams;
	const languages = query.get('lang') || '';

	const data = await api.get(`episodes/random?lang=${languages}`);

	return {
		body: data
	};
}
