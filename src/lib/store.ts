import { writable } from 'svelte/store';
import { browser } from '$app/env';

interface ActiveEpisode {
	podcastTitle: string;
	id: number;
	episodeTitle: string;
	duration: number;
	url: string;
}

const storedLanguages = JSON.parse(browser && localStorage.getItem('selectedLanguages')) || ['en'];
const storedCategories = JSON.parse(browser && localStorage.getItem('selectedCategories')) || [];

export const selectedLanguages = writable<Array<string>>(browser && storedLanguages);
export const selectedCategories = writable<Array<number>>(browser && storedCategories);

selectedLanguages.subscribe(
	(value) => browser && (localStorage.selectedLanguages = JSON.stringify(value))
);

selectedCategories.subscribe(
	(value) => browser && (localStorage.selectedCategories = JSON.stringify(value))
);

export const selectedPodcastId = writable<number>(null);
export const activeEpisode = writable<ActiveEpisode>(null);
export const isPlaying = writable<boolean>(false);
