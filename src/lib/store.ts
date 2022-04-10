import { writable } from 'svelte/store';

export const selectedPodcastId = writable(null);
export const activeEpisode = writable(null);
