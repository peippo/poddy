<script lang="ts">
	export let categories;

	const categoryNames = Object.values(categories).map((category) => category);
</script>

<ul>
	<h3 class="screen-reader-text">Categories</h3>

	{#each categoryNames as name}
		<li>
			<span>{name}</span>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.5rem;
		list-style-type: none;
		margin: 0;
		padding: 0;
	}

	span {
		display: inline-flex;
		background-color: var(--color-gray);
		color: var(--color-black);
		padding: 0.25rem 0.5rem;
		border-radius: 5px;
	}
</style>
