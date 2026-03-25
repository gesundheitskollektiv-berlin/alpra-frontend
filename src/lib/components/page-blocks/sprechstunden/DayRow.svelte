<script>
	import SlotEntry from './SlotEntry.svelte';

	let { tag = {}, formatDoctors } = $props();
</script>

<div class="day-row row py-3">
	<div class="col-md-3">
		<h4 class="fw-bold mb-0">{tag.day}</h4>
	</div>
	{#if tag.sprechzeiten && tag.sprechzeiten.length > 0}
		{#each tag.sprechzeiten as slot, k (slot.id ?? k)}
			<div class="col">
				<SlotEntry {slot} {formatDoctors} />
			</div>
		{/each}
	{:else}
		<div class="col">
			<span>-</span>
		</div>
	{/if}
</div>

<style>
	.day-row + :global(.day-row) {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}
</style>
