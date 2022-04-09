<div class="article">
	<div class="button">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="32" height="32">
			<path
				fill="currentColor"
				d="M256 32C256 14.33 270.3 0 288 0C429.4 0 544 114.6 544 256C544 302.6 531.5 346.4 509.7 384C500.9 399.3 481.3 404.6 465.1 395.7C450.7 386.9 445.5 367.3 454.3 351.1C470.6 323.8 480 291 480 255.1C480 149.1 394 63.1 288 63.1C270.3 63.1 256 49.67 256 31.1V32z"
			/>
		</svg>
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
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--color-dark-gray);
		color: var(--color-light-gray);
		padding: 1rem;

		svg {
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
