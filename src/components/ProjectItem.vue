<template>
	<div class="rounded-lg p-3 hover:bg-slate-50 transition-colors flex flex-col gap-2">
		<h4 class="title__project font-medium">{{ title }}</h4>
		<div class="description__project text-sm text-slate-500">{{ description }}</div>
		<div class="flex gap-2 text-sm text-slate-700">
			<a class="flex items-center gap-1" :href="rephref">				
				<SvgIcon class="w-4 h-4 def-icon stroke-slate-500" icon="#git"/>
				<span>Репозиторий</span> 
			</a>
			<a class="flex items-center gap-1" :href="sitehref">				
				<SvgIcon class="w-4 h-4 def-icon stroke-slate-500" icon="#link"/>
				<span>Сайт</span> 
			</a>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'ProjectItem',
		props: {
			title: {
				type: String,
				required: true
			},
			description: {
				type: String,
				required: true
			},
			rephref: {
				type: String,
				required: true
			},
			sitehref: {
				type: String,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>