<script>
	import { loadingIcon } from '$lib/icons';
</script>

<div class="article">
	<div class="loading-button">
		{@html loadingIcon}
	</div>
	<div class="content">
		<div class="header">
			<div class="skeleton h2" />
		</div>

		<div class="skeleton description" />
		<div class="skeleton description description--2" />
	</div>
</div>

<style lang="scss">
	.article {
		display: flex;
		position: relative;
		border-top: 1px solid var(--color-dark-gray);
		height: var(--podcast-row-height);
		overflow: hidden;
		flex-direction: row-reverse;

		@media (min-width: $medium-breakpoint) {
			flex-direction: row;
		}
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.loading-button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--color-dark-gray);
		color: var(--color-light-gray);
		width: var(--row-button-width);

		:global(svg) {
			animation: spin 0.75s infinite;
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

	.skeleton {
		background-color: var(--color-dark-gray);
		margin-bottom: 0.5rem;
		border-radius: 5px;
		overflow: hidden;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			transform: translateX(-100%);
			background-image: linear-gradient(
				90deg,
				rgba(#fff, 0) 0,
				rgba(#fff, 0.15) 20%,
				rgba(#fff, 0.25) 50%,
				rgba(#fff, 0.15) 80%,
				rgba(#fff, 0)
			);
			animation: skeleton 1.5s infinite;
		}
	}

	.h2 {
		width: 40%;
		height: 1.5rem;
		margin-bottom: 0.75rem;
	}

	.description {
		width: 60%;
		height: 1rem;
	}

	.description--2 {
		width: 55%;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes skeleton {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
</style>
