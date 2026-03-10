<script>
	import WelcomeBlock from '$lib/components/page-blocks/WelcomeBlock.svelte';
	import AboutBlock from '$lib/components/page-blocks/AboutBlock.svelte';
	import ServicesBlock from '$lib/components/page-blocks/ServicesBlock.svelte';
	import SprechstundenBlock from '$lib/components/page-blocks/SprechstundenBlock.svelte';
	import ContactBlock from '$lib/components/page-blocks/ContactBlock.svelte';
	import FooterBlock from '$lib/components/page-blocks/FooterBlock.svelte';
	import StrapiImage from '$lib/components/StrapiImage.svelte';

	let { data } = $props();

	console.log('data:', JSON.stringify(data, null, 2));

	const landingPage = $derived(data['alpra-page-landing']?.data ?? {});
	const landingBlocks = $derived(landingPage?.content ?? []);
	const meta = $derived(data['alpra-meta']?.data ?? {});
	const locale = $derived(data.locale);

	$effect(() => {
		console.log('landingPage:', landingPage);
		console.log('landingBlocks:', landingBlocks);
		console.log('meta:', meta);
		console.log('locale:', locale);
	});
</script>

{#if meta?.page_banner}
	<div class="w-100">
		<StrapiImage asset={meta.page_banner} alt="Banner" class="img-fluid w-100" />
	</div>
{/if}

{#each landingBlocks as block, idx (`${block?.__component ?? 'unknown'}-${block?.id ?? idx}`)}
	{#if block?.__component === 'alpra-page-blocks.welcome'}
		<WelcomeBlock data={block} />
	{:else if block?.__component === 'alpra-page-blocks.about'}
		<AboutBlock data={block} {locale} />
	{:else if block?.__component === 'alpra-page-blocks.services'}
		<ServicesBlock data={block} />
	{:else if block?.__component === 'alpra-page-blocks.sprechstunden'}
		<SprechstundenBlock data={block} />
	{:else if block?.__component === 'alpra-page-blocks.contact'}
		<ContactBlock data={block} {meta} />
	{:else if block?.__component === 'alpra-page-blocks.footer'}
		<FooterBlock data={block} {meta} {locale} />
	{/if}
{/each}
