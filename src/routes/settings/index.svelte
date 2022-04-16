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
	import { checkIcon } from '$lib/icons';

	import { selectedLanguages, selectedCategories } from '$lib/store';
	import type { CategoriesList } from 'src/types/podcastIndex.type';

	const languages = [
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
	<h2 class="screen-reader-text">Filter settings</h2>

	<h3>Languages</h3>
	<div class="list">
		{#each languages as language}
			<input
				id={language.code}
				type="checkbox"
				checked={$selectedLanguages.includes(language.code)}
				disabled={language.code === 'en' &&
					$selectedLanguages.length === 1 &&
					$selectedLanguages.includes('en')}
				on:change={() => {
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
	</div>

	<h3 class="top-margin">Categories</h3>
	{#if feeds}
		<div class="list">
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
					on:change={() => {
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
		</div>
	{/if}
	<a class="save-button" href="/">
		{@html checkIcon}
		Save settings
	</a>
</main>

<style lang="scss">
	main {
		padding: 2rem;
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	h3 {
		color: var(--color-light-gray);
		font-size: 1rem;
		margin-top: 0;
	}

	.top-margin {
		margin-top: 2rem;
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
		margin-top: 3rem;
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
