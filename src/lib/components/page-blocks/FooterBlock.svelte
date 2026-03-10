<script>
	import { slugify } from '$lib/helpers/landingBlocks';

	let { data = {}, meta = {}, locale = 'de' } = $props();

	const backgroundClass = $derived(
		data?.background_color ? `bg-alpra-${data.background_color}` : 'bg-alpra-green'
	);
	const sectionId = $derived(data?.navbar_link_title ? slugify(data.navbar_link_title) : 'footer');
	const baseUrl = $derived(`/${locale}`);
</script>

<footer id={sectionId} class={`${backgroundClass} py-5`}>
	<div class="container fs-5" id="footer">
		<div class="row justify-content-center">
			<div class="col-lg-8 col-md-9 col-sm-11">
				<div class="row">
					<div class="col-12">
						<a href={baseUrl}>
							<figure class="mb-0 py-3 text-start">
								<img
									src="/assets/img/Logo_Alpra.svg"
									alt="Logo"
									style="height: 80px; width: auto;"
								/>
							</figure>
						</a>
					</div>
				</div>

				<div class="row mt-4">
					<div class="col-md-6 contact-data">
						<h5 class="h5">Kontakt</h5>
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

					<div class="col-md-6">
						<h5 class="h5">Impressum</h5>
						{#if meta?.company}
							<p class="fw-bold">{meta.company}</p>
						{/if}

						<div class="mt-4">
							<a href="{baseUrl}/datenschutz" class="text-decoration-underline">Datenschutz</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>
