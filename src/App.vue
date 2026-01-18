<template>
	<div class="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
		<div class="img-block rounded-xl overflow-hidden mb-8">
			<img class="object-cover" src="./assets/img/myphoto.webp" alt="">
		</div>
		<div class="flex text-center flex-col gap-1 mb-6">
			<h1 class="title text-xl font-semibold">Frontend pet project</h1>
			<h2 class="subtitle text-lg text-slate-500">Мои пет-проекты </h2>
		</div>
		<ProjectList/>
	</div>
</template>

<script>
import ProjectList from './components/ProjectList.vue';

	export default {
		components: {
			ProjectList,
		}
	}
</script>

<style lang="scss">

</style>
