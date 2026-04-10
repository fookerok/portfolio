<template>
    <Admin>
        <div class="projects-list">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Добавить</h2>
                <router-link 
                    to="/admin/projects" 
                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                Назад
                </router-link>
            </div>
            <ProjectAdd/>
        </div>
    </Admin>
</template>

<script setup>
import ProjectAdd from '../components/ProjectAdd.vue';
import Admin from './Admin.vue';

</script>

<style lang="scss" scoped>

</style>