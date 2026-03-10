<script>
	import { resolveRichText } from '$lib/helpers/richTextResolver';
	import { slugify } from '$lib/helpers/landingBlocks';

	let { data = {}, meta = {} } = $props();

	let showGoogleMap = $state(false);

	const backgroundClass = $derived(
		data?.background_color ? `bg-alpra-${data.background_color}` : 'bg-alpra-white'
	);
	const sectionId = $derived(
		data?.navbar_link_title ? slugify(data.navbar_link_title) : 'contact'
	);
	const mapQuery = $derived(
		encodeURIComponent(`${meta?.street ?? ''}, ${meta?.postal ?? ''} ${meta?.city ?? ''}`.trim())
	);

	const toggleMap = () => (showGoogleMap = !showGoogleMap);
</script>

<section id={sectionId} class={`${backgroundClass} py-0`}>
	<div class="container" id="contact">
		<div class="row justify-content-center">
			<div class="col-lg-8 col-md-9 col-sm-11 my-5">
				<h2 class="mb-4">{data.title}</h2>

				<div class="row mb-5">
					<div class="col-md-6" id="contact-data">
						{#if meta?.street}
							<p>
								<span class="fa fa-home" aria-hidden="true"></span>
								&nbsp;
								{meta.street}, {meta.postal}
								{meta.city}
							</p>
						{/if}

						{#if meta?.phone}
							<p>
								<span class="fa fa-phone" aria-hidden="true"></span>
								&nbsp;
								<a href="tel:{meta.phone}">{meta.phone}</a>
							</p>
						{/if}

						{#if meta?.fax}
							<p>
								<span class="fa fa-fax" aria-hidden="true"></span>
								&nbsp;
								{meta.fax}
							</p>
						{/if}

						{#if meta?.email}
							<p>
								<span class="fa fa-envelope" aria-hidden="true"></span>
								&nbsp;
								<a href="mailto:{meta.email}">{meta.email}</a>
							</p>
						{/if}
					</div>
				</div>

				<div class="row mb-5">
					<div class="col-md-7">
						<div id="map-simple" class={showGoogleMap ? 'd-none' : ''}>
							<div class="ratio ratio-16x9 bg-light d-flex align-items-center justify-content-center">
								<iframe
									src={`https://maps.google.com/maps?width=100%25&height=600&hl=de&q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
									allowfullscreen
									loading="lazy"
									title="Google Maps"
								></iframe>
							</div>
						</div>
					</div>

					<div class="col-md-5">
						{#if data?.content}
							<div class="content-container">
								{@html resolveRichText(data.content)}
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.content-container {
		overflow-wrap: break-word;
		word-wrap: break-word;
		max-width: 100%;
		overflow: hidden;
	}

	.content-container :global(ul) {
		padding-left: 1rem !important;
	}
</style>
