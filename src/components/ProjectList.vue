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

<script>
	import ProjectItem from '../components/ProjectItem.vue';
	export default {
		data (){
			return{
				projectList: [
					{
						titleList: 'Vue project',
						icon: '#logo-vue',
						projects: [
							{
								title: 'Escadrille server',
								description: 'Сайт для сервера по игре Minecraft, работа с данными API сервера, галерея',
								rephref: '#',
								sitehref: '#'
							},
							{
								title: 'Расходняк',
								description: 'Подсчет ежемесячных расходов, помощник',
								rephref: '#',
								sitehref: '#'
							},
						]
					},
					{
						titleList: 'Ether project',
						icon: '#ether',
						projects: [
							{
								title: 'Soon',
								description: 'soon...',
								rephref: '#',
								sitehref: '#'
							},
						]
					},
				]
			}
		},
		name: 'ProjectList',
		components: {
			ProjectItem
		}
	}
</script>

<style lang="scss" scoped>

</style>