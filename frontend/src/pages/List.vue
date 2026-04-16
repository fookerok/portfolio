<template>
	<transition v-if="loading" name="fade">
		<Preloader />
	</transition>
	<transition v-else name="fade-slide" appear>
			<div class="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
				<div class="img-block rounded-xl overflow-hidden mb-8">
					  <img v-if="imageUrl" class="w-full max-h-[350px] object-cover" :src="imageUrl" alt="">
				</div>
				<div class="flex justify-between px-6">
					<div class="flex flex-col gap-1 mb-6">
						<h1 class="title text-xl font-semibold">{{ settings.site_name }}</h1>
						<h2 class="subtitle text-lg text-slate-500">{{settings.site_description}}</h2>
						<router-link to="/login">Admin panel</router-link>					
					</div>
					<div class="flex flex-col gap-1 mb-6">
						<div class="flex gap-1">
							<a class="contact-link" :href="settings.link_tg" target="_blank">
								<SvgIcon class="w-6 h-6 def-icon fill-current text-black hover:text-slate-500 transition-colors duration-300" icon="#telegram"/>
							</a>
							<a class="contact-link" :href="settings.link_git" target="_blank">
								<SvgIcon class="w-6 h-6 def-icon fill-current  text-black hover:text-slate-500 transition-colors duration-300" icon="#github"/>
							</a>
						</div>
					</div>
				</div>
				<ProjectList/>
			</div>
	</transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Preloader from '../components/Preloader.vue';
import ProjectList from '../components/ProjectList.vue';

const imageUrl = ref('');

const loading = ref(true);
const settings = ref({
    site_name: '',
    site_description: '',
    link_tg: '',
    link_git: '',
    site_title: ''
});

const loadAppData = async () => {
    try {
       const res = await axios.get(`${import.meta.env.VITE_API_URL}/settings`);
        if (res.data) {
            settings.value = res.data;
            document.title = settings.value.site_title || 'Portfolio';
        }
		if (res.data.image) {
			imageUrl.value = `${import.meta.env.VITE_API_URL}${res.data.image}`;
		}
    } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
    } finally {
        setTimeout(() => {
            loading.value = false;
        }, 600);
    }
};

onMounted(() => {
    loadAppData();
});
</script>

<style lang="scss" scoped>
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