<script>
	import { resolveRichText } from '$lib/helpers/richTextResolver';
	import { slugify } from '$lib/helpers/landingBlocks';

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
										<div class="day-row row py-3">
											<div class="col-md-3">
												<h4 class="fw-bold mb-0">{tag.day}</h4>
											</div>
											<div class="col-md-9">
												{#if tag.sprechzeiten && tag.sprechzeiten.length > 0}
													{#each tag.sprechzeiten as slot, k (slot.id ?? k)}
														<div class="slot-entry" class:mt-2={k > 0} class:pt-2={k > 0}>
															<div>
																{#if slot.description}
																	<span class="fw-semibold">{slot.description}:</span>
																{/if}
																{#if slot.start && slot.end}
																	<span>&nbsp;{slot.start}-{slot.end}</span>
																{:else if slot.start}
																	<span>&nbsp;{slot.start}</span>
																{:else}
																	<span>-</span>
																{/if}
															</div>

															{#if formatDoctors(slot.doctors)}
																<div class="doctor-links small">
																	{@html formatDoctors(slot.doctors)}
																</div>
															{/if}

															{#if slot.annotation}
																<div class="fst-italic small text-muted">
																	{slot.annotation}
																</div>
															{/if}
														</div>
													{/each}
												{:else}
													<span>-</span>
												{/if}
											</div>
										</div>
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

	.day-row + .day-row {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.slot-entry + .slot-entry {
		border-top: 1px solid rgba(0, 0, 0, 0.07);
	}

	.doctor-links :global(a) {
		color: inherit;
		text-decoration: none;
	}

	.doctor-links :global(a:hover) {
		text-decoration: underline;
	}
</style>
