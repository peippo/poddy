import { writable } from 'svelte/store';
import { browser } from '$app/env';

const storedLanguages = JSON.parse(browser && localStorage.getItem('selectedLanguages')) || ['en'];
const storedCategories = JSON.parse(browser && localStorage.getItem('selectedCategories')) || [];

export const selectedLanguages = writable(browser && storedLanguages);
export const selectedCategories = writable(browser && storedCategories);

selectedLanguages.subscribe(
	(value) => browser && (localStorage.selectedLanguages = JSON.stringify(value))
);

selectedCategories.subscribe(
	(value) => browser && (localStorage.selectedCategories = JSON.stringify(value))
);

export const selectedPodcastId = writable(null);
export const activeEpisode = writable(null);
export const isPlaying = writable(false);
