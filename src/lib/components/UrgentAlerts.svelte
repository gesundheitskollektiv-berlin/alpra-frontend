<script>
	import { resolveRichText } from '$lib/helpers/richTextResolver';

	let { announcements = [] } = $props();
</script>

{#each announcements as announcement (announcement.id)}
	<div class="urgent-alert bg-alpra-red text-white">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-lg-8 col-md-9 col-sm-11 py-3">
					{#if announcement.content}
						{@html resolveRichText(announcement.content)}
					{/if}
				</div>
			</div>
		</div>
	</div>
{/each}

<style>
	.urgent-alert :global(p) {
		margin-bottom: 0;
	}
	.urgent-alert :global(a) {
		color: white;
		text-decoration: underline;
	}
</style>
