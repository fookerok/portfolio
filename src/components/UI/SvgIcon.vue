<template>
	<svg class="icon">
		<use :href="icon" />
	</svg>
</template>

<script>
	export default {
		name: 'SvgIcon',
		props: {
			icon: {
				type: String,
				required: true 
			}
		}
	}

</script>

<style lang="scss" scoped>

</style>