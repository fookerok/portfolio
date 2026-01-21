<template>
	<transition v-if="loading" name="fade">
		<Preloader />
	</transition>
	<transition v-else name="fade-slide" appear>
			<div class="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
			<div class="img-block rounded-xl overflow-hidden mb-8">
				<img class="object-cover" src="./assets/img/myphoto.webp" alt="">
			</div>
			<div class="flex justify-between px-6">
				<div class="flex flex-col gap-1 mb-6">
					<h1 class="title text-xl font-semibold">Frontend pet project</h1>
					<h2 class="subtitle text-lg text-slate-500">Мои пет-проекты</h2>
				</div>
				<div class="flex flex-col gap-1 mb-6">
  <button
    @click="toggleTheme"
    class="px-4 py-2 rounded transition-colors duration-300
           bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
  >
    {{ isDark ? 'Светлая тема' : 'Темная тема' }}
  </button>
					<div class="flex gap-1">
						<a class="contact-link" href="https://t.me/fookernya" target="_blank">
							<SvgIcon class="w-6 h-6 def-icon fill-current text-black hover:text-slate-500 transition-colors duration-300" icon="#telegram"/>
						</a>
						<a class="contact-link" href="https://github.com/fookerok" target="_blank">
							<SvgIcon class="w-6 h-6 def-icon fill-current  text-black hover:text-slate-500 transition-colors duration-300" icon="#github"/>
						</a>
					</div>
				</div>
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

