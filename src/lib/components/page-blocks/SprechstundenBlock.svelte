<script>
	import { resolveRichText } from '$lib/helpers/richTextResolver';
	import { slugify } from '$lib/helpers/landingBlocks';
	import DayRow from './sprechstunden/DayRow.svelte';

	let { data = {} } = $props();

	const backgroundClass = $derived(
		data?.background_color ? `bg-alpra-${data.background_color}` : 'bg-alpra-white'
	);
	const sectionId = $derived(
		data?.navbar_link_title ? slugify(data.navbar_link_title) : 'sprechstunden'
	);

	function formatDoctors(doctors) {
		if (!doctors || doctors.length === 0) return '';
		return doctors
			.map((d) => {
				const name = `${d.first_name ?? ''} ${d.last_name ?? ''}`.trim();
				return `<a href="#über-uns">${name}</a>`;
			})
			.join(', ');
	}
</script>

<section id={sectionId} class={backgroundClass}>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-8 col-md-9 col-sm-11 my-5">
				<h2>{data.title}</h2>

				{#if data?.sprechstunden}
					{#each data.sprechstunden as sprechstunde, i (sprechstunde.id ?? i)}
						<div class="sprechstunde-type mt-5">
							{#if sprechstunde.type}
								<h3>{sprechstunde.type}</h3>
							{/if}

							{#if sprechstunde.description}
								<div class="mt-2">
									{@html resolveRichText(sprechstunde.description)}
								</div>
							{/if}

							{#if sprechstunde.days && sprechstunde.days.length > 0}
								<div class="mt-3">
									{#each sprechstunde.days as tag, j (tag.id ?? j)}
										<DayRow {tag} {formatDoctors} />
									{/each}
								</div>
							{/if}
						</div>
					{/each}
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
