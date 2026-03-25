<script>
	import StrapiImage from '$lib/components/StrapiImage.svelte';

	let { person = {} } = $props();
</script>

<div class="col-md-4 mb-4 text-center person-card">
	{#if person.image}
		<StrapiImage
			asset={person.image}
			alt="{person.first_name} {person.last_name}"
			class="img-fluid rounded personnel-img"
		/>
	{/if}
	<h5 class="mt-3 mb-0">{person.first_name} {person.last_name}</h5>
	{#if person.position}
		<p class="text-muted">{person.position}</p>
	{/if}
</div>

<style>
	.person-card {
		line-height: 1.4;
	}

	:global(.personnel-img) {
		aspect-ratio: 1;
		object-fit: cover;
		width: 100%;
	}
</style>
