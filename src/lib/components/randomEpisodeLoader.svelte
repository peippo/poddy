<div class="article">
	<div class="skeleton button" />
	<div class="content">
		<div class="skeleton h2" />
		<div class="skeleton description" />
	</div>
</div>

<style lang="scss">
	.article {
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
	}

	.content {
		width: 100%;
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

	.button {
		width: 64px;
		height: 64px;
		min-width: 64px;
		min-height: 64px;
		border-radius: 1000px;
		margin-right: 1rem;
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

	@keyframes skeleton {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
</style>
