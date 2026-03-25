<template>
	<div class="flex flex-col gap-6">
		<div 
		v-for="(list, listIndex) in projectList"
		:key="listIndex"
		class="bg-white rounded-xl shadow-sm p-6">
		<div class="flex gap-2 items-center text-lg">
			<SvgIcon class="w-6 h-6" :icon="list.icon"/>
			<h3 class="title__list">{{ list.titleList }}</h3>
		</div>
			<ProjectItem
				v-for="(project, index) in list.projects"
				:key="index"
				:titleList="list.titleList"
				:title="project.title"
				:description="project.description"
				:rephref="project.rephref"
				:sitehref="project.sitehref"
			/>
		</div>
	</div>
</template>

<script setup>
    import ProjectItem from '../components/ProjectItem.vue';
    import { ref, onMounted, computed } from 'vue';
    import axios from 'axios';

    const projects = ref([]);

    const projectList = computed(() => {
        const groups = {};
        
        projects.value.forEach(project => {
            const catName = project.category || 'Без категории';
            if (!groups[catName]) {
                groups[catName] = {
                    titleList: catName,
                    icon: '#projects',
                    projects: []
                };
            }
            groups[catName].projects.push({
                title: project.name,
                description: project.descr,
                rephref: project.linkGit,
                sitehref: project.linkSite
            });
        });

        return Object.values(groups);
    });

    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/projects');
            projects.value = res.data;
        } catch (err) {
            console.error('Ошибка загрузки', err);
        }
    }

    onMounted(() => {
        fetchProjects();
    });
</script>

<style lang="scss" scoped>

</style>