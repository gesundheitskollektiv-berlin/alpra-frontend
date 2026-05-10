<script>
	import DesktopNav from './DesktopNav.svelte';
	import MobileNav from './MobileNav.svelte';

	let { landingBlocks = [], locale = 'de' } = $props();
</script>

<div class="d-none d-xl-block"><DesktopNav {landingBlocks} {locale} /></div>
<div class="d-block d-xl-none"><MobileNav {landingBlocks} {locale} /></div>
