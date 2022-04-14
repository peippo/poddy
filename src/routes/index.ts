import * as api from '$lib/api.js';

export async function get() {
	const data = await api.get(`podcasts/trending`);

	return {
		body: data
	};
}
