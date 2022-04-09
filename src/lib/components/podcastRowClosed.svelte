<script lang="ts">
	import { selectedPodcastId } from '$lib/store';

	export let feed;
</script>

<article>
	<button on:click={() => ($selectedPodcastId = feed.id)}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="32" height="32">
			<path
				fill="currentColor"
				d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
			/>
		</svg>
		<span class="screen-reader-text">View {feed.title} details</span>
	</button>
	<div class="content">
		<header>
			<h2>{feed.title}</h2>
			<span class="author">{feed.author}</span>
		</header>

		<p>{feed.description}</p>
	</div>
</article>

<style lang="scss">
	article {
		display: flex;
		position: relative;
		border-top: 1px solid var(--color-dark-gray);
		height: var(--podcast-row-height);
		overflow: hidden;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	button {
		appearance: none;
		background: var(--color-pink);
		border: 0;
		padding: 1rem;
		color: #fff;
		transition: color 0.2s ease-in-out;

		&:hover {
			color: var(--color-dark-gray);
			cursor: pointer;
		}
	}

	.content {
		position: relative;
		padding: 1rem 2rem;
		width: 100%;

		&:after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 30px;
			background: linear-gradient(to top, var(--color-black), rgba(0, 0, 0, 0));
		}
	}

	h2 {
		margin: 0;
		color: var(--color-pink);
	}

	p {
		margin: 0;
	}
</style>
