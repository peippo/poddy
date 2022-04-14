import * as api from '$lib/api.js';

export async function get({ params }) {
	const { id } = params;

	const [details, episodes] = await Promise.all([
		api.get(`podcasts/byfeedid?id=${id}`),
		api.get(`episodes/byfeedid?id=${id}&max=5`)
	]);

	return {
		body: { details: details.feed, episodes: episodes.items }
	};
}
