<script>
	import { resolveRichText } from '$lib/helpers/richTextResolver';
	import { slugify } from '$lib/helpers/landingBlocks';
	import StrapiImage from '$lib/components/StrapiImage.svelte';

	let { data = {}, locale = 'de', personnel = [] } = $props();

	const backgroundClass = $derived(
		data?.background_color ? `bg-alpra-${data.background_color}` : 'bg-alpra-white'
	);
	const sectionId = $derived(data?.navbar_link_title ? slugify(data.navbar_link_title) : 'about');
</script>

<section id={sectionId} class={backgroundClass}>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-8 col-md-9 col-sm-11 my-5">
				<h2>{data.title}</h2>

				{#if data?.content}
					<div class="mt-4">
						{@html resolveRichText(data.content)}
					</div>
				{/if}

				{#if personnel.length > 0}
					<div class="row mt-5">
						{#each personnel as person (person.id)}
							<div class="col-md-4 mb-4 text-center">
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
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	:global(.personnel-img) {
		aspect-ratio: 1;
		object-fit: cover;
		width: 100%;
	}
</style>
