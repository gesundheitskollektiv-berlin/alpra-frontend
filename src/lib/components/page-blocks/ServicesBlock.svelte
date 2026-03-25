<script>
	import { resolveRichText } from '$lib/helpers/richTextResolver';
	import { slugify } from '$lib/helpers/landingBlocks';

	let { data = {} } = $props();

	const backgroundClass = $derived(
		data?.background_color ? `bg-alpra-${data.background_color}` : 'bg-alpra-white'
	);
	const sectionId = $derived(
		data?.navbar_link_title ? slugify(data.navbar_link_title) : 'services'
	);
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
			</div>
		</div>
	</div>
</section>

<style>
	section {
		line-height: 2;
	}
</style>
