import * as api from '$lib/api.js';

export async function get({ params }) {
	const { id } = params;
	const data = await api.get(`/podcasts/byfeedid?id=${id}`);

	return {
		body: data
	};
}
