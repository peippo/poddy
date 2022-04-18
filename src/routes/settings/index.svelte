<script lang="ts" context="module">
	export async function load({ fetch }) {
		const response = await fetch(`/api/categories/__data.json`).then((res) => res.json());

		return {
			status: response.status,
			props: {
				data: response
			}
		};
	}
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { checkIcon } from '$lib/icons';

	import { selectedLanguages, selectedCategories } from '$lib/store';
	import type { CategoriesList } from 'src/types/podcastIndex.type';

	const languages: { label: string; code: string }[] = [
		{ label: 'English', code: 'en' },
		{ label: 'Chinese', code: 'zh' },
		{ label: 'Danish', code: 'da' },
		{ label: 'Dutch', code: 'nl' },
		{ label: 'Estonian', code: 'et' },
		{ label: 'Finnish', code: 'fi' },
		{ label: 'French', code: 'fr' },
		{ label: 'German', code: 'de' },
		{ label: 'Greek', code: 'el' },
		{ label: 'Icelandic', code: 'is' },
		{ label: 'Indonesian', code: 'in' },
		{ label: 'Italian', code: 'it' },
		{ label: 'Japanese', code: 'ja' },
		{ label: 'Korean', code: 'ko' },
		{ label: 'Norwegian', code: 'no' },
		{ label: 'Portuguese', code: 'pt' },
		{ label: 'Spanish', code: 'es' },
		{ label: 'Swedish', code: 'sv' },
		{ label: 'Turkish', code: 'tr' },
		{ label: 'Ukranian', code: 'uk' }
	];

	export let data: CategoriesList;
	$: feeds = data?.feeds;

	$: if ($selectedLanguages.length === 0) {
		$selectedLanguages = ['en'];
	}
</script>

<main>
	<header>
		<h1>Filter settings</h1>
	</header>

	{#if browser}
		<div class="content">
			<fieldset>
				<legend>Languages</legend>
				{#each languages as language}
					<input
						id={language.code}
						type="checkbox"
						checked={$selectedLanguages.includes(language.code)}
						disabled={language.code === 'en' &&
							$selectedLanguages.length === 1 &&
							$selectedLanguages.includes('en')}
						on:change|preventDefault={() => {
							if ($selectedLanguages.includes(language.code)) {
								const newLanguages = $selectedLanguages.filter((code) => code !== language.code);
								$selectedLanguages = newLanguages;
							} else {
								$selectedLanguages = [...$selectedLanguages, language.code];
							}
						}}
					/>
					<label for={language.code}>{language.label}</label>
				{/each}
			</fieldset>

			{#if feeds}
				<fieldset>
					<legend>Categories</legend>
					<input
						on:change|preventDefault={() => ($selectedCategories = [])}
						id="all-categories"
						type="checkbox"
						checked={$selectedCategories.length === 0}
						disabled={$selectedCategories.length === 0}
					/>
					<label for="all-categories">All categories</label>

					{#each feeds as feed}
						<input
							id={feed.name}
							type="checkbox"
							checked={$selectedCategories.includes(feed.id)}
							on:change|preventDefault={() => {
								if ($selectedCategories.includes(feed.id)) {
									const newCategories = $selectedCategories.filter((id) => id !== feed.id);
									$selectedCategories = newCategories;
								} else {
									$selectedCategories = [...$selectedCategories, feed.id];
								}
							}}
						/>
						<label for={feed.name}>
							{feed.name}
						</label>
					{/each}
				</fieldset>
			{/if}
			<a class="save-button" href="/" sveltekit:prefetch>
				{@html checkIcon}
				Save settings
			</a>
		</div>
	{/if}
</main>

<style lang="scss">
	header {
		padding: 1rem 2rem 0.5rem;
		display: flex;
		align-items: flex-start;
		align-items: center;
		background-color: #161617;
		border-bottom: 1px solid var(--color-dark-gray);
		z-index: 5;
	}

	h1 {
		margin: 0;
	}

	.content {
		padding: 2rem;
	}

	fieldset {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0 0 2rem 0;
		padding: 0;
		border: 0;
	}

	legend {
		color: var(--color-light-gray);
		font-size: 1rem;
		margin: 0 0 0.5rem 0;
	}

	label {
		display: inline-flex;
		background-color: var(--color-gray);
		color: var(--color-black);
		padding: 0.2rem 0.5rem;
		border-radius: 3px;

		&:hover {
			cursor: pointer;
		}
	}

	input {
		position: absolute;
		appearance: none;
		margin: 0;
		background-color: transparent;
		opacity: 0;
		z-index: -1;

		&:disabled + label:hover {
			cursor: not-allowed;
		}

		&:focus {
			& + label {
				outline: 2px dotted var(--color-pink);
				outline-offset: 2px;
			}
		}

		&:focus:not(:focus-visible) {
			& + label {
				outline: none;
			}
		}

		&:checked {
			& + label {
				background-color: var(--color-pink);
				color: var(--color-black);
			}
		}
	}

	.save-button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
		font-size: 1.125rem;
		padding: 0.5rem 1rem;
		background-color: #fff;
		color: var(--color-black);
		text-decoration: none;
		transition: background-color 0.25s;
		border-radius: 3px;

		:global(svg) {
			margin-right: 0.5rem;
		}

		&:hover {
			background-color: var(--color-light-gray);
		}

		&:focus {
			outline: 2px dotted var(--color-pink);
			outline-offset: 2px;
		}

		&:focus:not(:focus-visible) {
			outline: none;
		}
	}
</style>
