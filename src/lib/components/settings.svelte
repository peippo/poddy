<script lang="ts">
	import { selectedLanguages, selectedCategories } from '$lib/store';
	import { fly, fade } from 'svelte/transition';

	async function fetchCategories() {
		const response = await fetch(`/api/categories`);
		const data = await response.json();

		if (response.ok) {
			return data;
		} else {
			throw new Error(data);
		}
	}

	const promise = fetchCategories();

	const languages = [
		{ label: 'Chinese', code: 'zh' },
		{ label: 'Danish', code: 'da' },
		{ label: 'Dutch', code: 'nl' },
		{ label: 'English', code: 'en' },
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

	const LABEL_TRANSITION_DELAY = 10;
	const SECTION_TRANSITION_DELAY = 250;
</script>

{#await promise then { feeds }}
	<section class="panel" in:fly={{ y: -25, duration: 500 }} out:fly={{ y: -25, duration: 250 }}>
		<h2 class="screen-reader-text">Filter settings</h2>

		<h3 in:fade={{ duration: 500, delay: SECTION_TRANSITION_DELAY }}>Languages</h3>
		<div class="list">
			{#each languages as language, index}
				<input
					id={language.code}
					type="checkbox"
					checked={$selectedLanguages.includes(language.code)}
					on:change={() => {
						if ($selectedLanguages.includes(language.code)) {
							const newLanguages = $selectedLanguages.filter((code) => code !== language.code);
							$selectedLanguages = newLanguages;
						} else {
							$selectedLanguages = [...$selectedLanguages, language.code];
						}
					}}
				/>
				<label
					for={language.code}
					in:fade={{
						duration: 100,
						delay: SECTION_TRANSITION_DELAY + index * LABEL_TRANSITION_DELAY
					}}>{language.label}</label
				>
			{/each}
		</div>

		<h3
			class="top-margin"
			in:fade={{
				duration: 500,
				delay: languages.length * LABEL_TRANSITION_DELAY + SECTION_TRANSITION_DELAY
			}}
		>
			Categories
		</h3>
		{#if feeds}
			<div class="list">
				<input
					on:change|preventDefault={() => ($selectedCategories = [])}
					id="all-categories"
					type="checkbox"
					checked={$selectedCategories.length === 0}
				/>
				<label
					for="all-categories"
					in:fade={{
						duration: 100,
						delay: languages.length * LABEL_TRANSITION_DELAY + SECTION_TRANSITION_DELAY
					}}>All categories</label
				>

				{#each feeds as feed, index}
					<input
						id={feed.id}
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
					<label
						for={feed.id}
						in:fade={{
							duration: 100,
							delay:
								languages.length * 10 + SECTION_TRANSITION_DELAY + index * LABEL_TRANSITION_DELAY
						}}
					>
						{feed.name}
					</label>
				{/each}
			</div>
		{/if}
	</section>
{/await}

<style lang="scss">
	.panel {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		background-color: var(--color-dark-gray);
		padding: calc(70px + 2rem) 2rem 2rem;
		box-shadow: 0 30px 50px 0 rgba(0, 0, 0, 0.5);
		color: var(--color-light-gray);
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
</style>
