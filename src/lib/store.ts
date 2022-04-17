import { writable } from 'svelte/store';
import { persist, localStorage } from '@macfja/svelte-persistent-store';

export const selectedPodcastId = writable(null);
export const activeEpisode = writable(null);
export const isPlaying = writable(false);
export const selectedCategories = persist(writable([]), localStorage(), 'selectedCategories');
export const selectedLanguages = persist(writable(['en']), localStorage(), 'selectedLanguages');
