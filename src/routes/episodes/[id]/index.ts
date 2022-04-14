import * as api from '$lib/api.js';

export async function get({ params }) {
	const { id } = params;

	const [podcast, episodes] = await Promise.all([
		api.get(`podcasts/byfeedid?id=${id}`),
		api.get(`episodes/byfeedid?id=${id}&fulltext=true`)
	]);

	return {
		body: { podcast: podcast, episodes: episodes }
	};
}
