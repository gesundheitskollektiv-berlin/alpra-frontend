<script>
	import { resolveRichText } from '$lib/helpers/richTextResolver';
	import { slugify } from '$lib/helpers/landingBlocks';

	let { data = {}, announcements = [] } = $props();

	const backgroundClass = $derived(
		data?.background_color ? `bg-alpra-${data.background_color}` : 'bg-alpra-white'
	);
	const sectionId = $derived(
		data?.navbar_link_title ? slugify(data.navbar_link_title) : 'announcements'
	);
</script>

<section id={sectionId} class={backgroundClass}>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-8 col-md-9 col-sm-11 my-5">
				{#if data.title}
					<h2>{data.title}</h2>
				{/if}

				{#each announcements as announcement (announcement.id)}
					<div class="announcement mt-4">
						{#if announcement.content}
							{@html resolveRichText(announcement.content)}
						{/if}
					</div>
				{/each}

				{#if announcements.length === 0}
					<p class="text-muted mt-4">Keine aktuellen Mitteilungen.</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.announcement + .announcement {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		padding-top: 1rem;
	}
</style>
