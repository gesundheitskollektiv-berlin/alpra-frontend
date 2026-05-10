<script>
	import { splitRichTextAtFirstHeading } from '$lib/helpers/richTextResolver';
	import { slugify } from '$lib/helpers/landingBlocks';

	let { data = {}, announcements = [], locale = 'de' } = $props();

	function formatPublishedDate(isoString) {
		if (!isoString) return '';
		const d = new Date(isoString);
		if (Number.isNaN(d.getTime())) return '';
		return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : locale, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		}).format(d);
	}

	const latestAnnouncements = $derived(
		[...announcements]
			.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
			.slice(0, 3)
	);

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

				{#each latestAnnouncements as announcement (announcement.id)}
					<div class="announcement mt-4">
						{#if announcement.content}
							{@const { headlineHtml, restHtml } = splitRichTextAtFirstHeading(
								announcement.content
							)}
							{#if announcement.publishedAt}
								<time
									class="announcement-published d-block text-start fst-italic small text-muted mb-1"
									datetime={announcement.publishedAt}
								>
									{formatPublishedDate(announcement.publishedAt)}
								</time>
							{/if}
							{#if headlineHtml}
								{@html headlineHtml}
							{/if}
							{#if restHtml}
								{@html restHtml}
							{/if}
						{/if}
					</div>
				{/each}

				{#if latestAnnouncements.length === 0}
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
