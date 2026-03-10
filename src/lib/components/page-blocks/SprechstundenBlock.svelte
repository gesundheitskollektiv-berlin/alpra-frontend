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
		return doctors.map((d) => `${d.first_name ?? ''} ${d.last_name ?? ''}`.trim()).join(', ');
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
								<div class="days-grid mt-3">
									{#each sprechstunde.days as tag, j (tag.id ?? j)}
										<div class="day-card mb-4">
											<h4 class="fw-bold">{tag.day}</h4>

											{#if tag.sprechzeiten && tag.sprechzeiten.length > 0}
												{#each tag.sprechzeiten as slot, k (slot.id ?? k)}
													<div class="slot-entry py-1">
														<div class="d-flex flex-wrap align-items-baseline gap-2">
															{#if slot.description}
																<span class="fw-bold">{slot.description}:</span>
															{/if}
															{#if slot.start && slot.end}
																<span>{slot.start}-{slot.end}</span>
															{:else if slot.start}
																<span>{slot.start}</span>
															{:else}
																<span>-</span>
															{/if}
														</div>

														{#if formatDoctors(slot.doctors)}
															<div class="text-muted small">
																{formatDoctors(slot.doctors)}
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
	.days-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}

	.day-card {
		padding: 0.75rem;
		border-radius: 0.5rem;
		background: rgba(255, 255, 255, 0.5);
	}

	.slot-entry + .slot-entry {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		margin-top: 0.25rem;
		padding-top: 0.25rem;
	}
</style>
