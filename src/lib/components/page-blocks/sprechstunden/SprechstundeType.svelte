<script>
	import { resolveRichText } from '$lib/helpers/richTextResolver';
	import DayRow from './DayRow.svelte';

	let { sprechstunde = {}, formatDoctors, locale = 'de' } = $props();

	const days = $derived(sprechstunde?.days ?? []);
</script>

<div class="sprechstunde-type mt-5">
	{#if sprechstunde.type}
		<h3>{sprechstunde.type}</h3>
	{/if}

	{#if sprechstunde.description}
		<div class="mt-2">
			{@html resolveRichText(sprechstunde.description)}
		</div>
	{/if}

	{#if days.length > 0}
		<div class="mt-3">
			{#each days as tag, j (tag.id ?? j)}
				<DayRow {tag} {formatDoctors} {locale} />
			{/each}
		</div>
	{/if}
</div>
