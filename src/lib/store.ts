import { writable } from 'svelte/store';

export const selectedPodcastId = writable(null);
export const activeEpisode = writable(null);
export const isPlaying = writable(false);
export const selectedCategories = writable([]);
export const selectedLanguages = writable(['en']);
