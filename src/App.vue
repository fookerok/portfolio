<template>
	<transition v-if="loading" name="fade">
		<Preloader />
	</transition>
	<transition v-else name="fade-slide" appear>
			<div class="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
			<div class="img-block rounded-xl overflow-hidden mb-8">
				<img class="object-cover" src="./assets/img/myphoto.webp" alt="">
			</div>
			<div class="flex text-center flex-col gap-1 mb-6">
				<h1 class="title text-xl font-semibold">Frontend pet project</h1>
				<h2 class="subtitle text-lg text-slate-500">Мои пет-проекты</h2>
			</div>
			<ProjectList/>
			</div>
	</transition>
</template>

<script>
import Preloader from './components/Preloader.vue';
import ProjectList from './components/ProjectList.vue';

export default {
	components: {
		ProjectList,
		Preloader
	},
	data(){
		return{
			loading: true,
		};
	},
	methods:{
		startLoading() {
			setTimeout(()=>{
				this.loading = false
			}, 2000)
		}
	},
	mounted(){
		this.startLoading()
	}
}

</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
	opacity: 0;
}

.fade-slide-enter-active {
	transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-slide-enter-from {
	opacity: 0;
	transform: translateY(20px);
}
.fade-slide-enter-to {
	opacity: 1;
	transform: translateY(0);
}
</style>

