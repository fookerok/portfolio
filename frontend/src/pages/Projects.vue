<template>
    <Admin>
        <div class="projects-list">
            <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Мои проекты</h2>
            <router-link 
                to="/admin/projects/add" 
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
                + Добавить проект
            </router-link>
            </div>
            <div class="overflow-x-auto bg-white rounded-xl shadow-sm">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="p-4 font-semibold text-gray-600">Категория</th>
                            <th class="p-4 font-semibold text-gray-600">Название</th>
                            <th class="p-4 font-semibold text-gray-600">Описание</th>
                            <th class="p-4 font-semibold text-gray-600">Сайт</th>
                            <th class="p-4 font-semibold text-gray-600">Репозиторий</th>
                            <th class="p-4 font-semibold text-gray-600">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr 
                    v-for="project in projects" 
                    :key="project.id" 
                    class="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                    <td class="p-4 font-medium">
                        <span v-if="editingId !== project.id">{{project.category}}</span>
                        <select v-else v-model="project.category_id">
                            <option v-for="category of categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </td>

                    <td class="p-4">
                        <span v-if="editingId !== project.id">{{ project.name }}</span>
                        <input v-else v-model="project.name" class="border p-1" />
                    </td>

                    <td class="p-4">
                        <span v-if="editingId !== project.id">{{ project.descr }}</span>
                        <textarea v-else v-model="project.descr" class="border p-1" ></textarea>
                    </td>

                    <td class="p-4">
                        <a v-if="editingId !== project.id" :href="project.linkSite" target="_blank">
                        {{ project.linkSite }}
                        </a>
                        <input v-else v-model="project.linkSite" class="border p-1" />
                    </td>

                    <td class="p-4">
                        <a v-if="editingId !== project.id" :href="project.linkGit" target="_blank">
                        {{ project.linkGit }}
                        </a>
                        <input v-else v-model="project.linkGit" class="border p-1" />
                    </td>

                    <td class="p-4">
                        <div v-if="editingId === project.id">
                            <button @click="editProject(project)">Сохранить</button>
                            <button @click="editingId = null">Отмена</button>
                        </div>
                        <div v-else>
                            <button @click="editingId = project.id">Изменить</button>
                            <button @click="removeProject(project.id)">Удалить</button>
                        </div>
                    </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Admin>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import Admin from './Admin.vue';
    import axios from 'axios'; 
        
    const editingId = ref(null);
    const categories = ref([]);
    const projects = ref([]);

    const fetchCategories = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/categories');
        categories.value = res.data;
    } catch (err) {
        console.error('Ошибка загрузки категорий', err);
    }
    };

    const fetchProjects = async () =>{
        try{
            const res = await axios.get('http://localhost:3000/api/projects');
            projects.value = res.data;
        } catch (err){
            console.error('Ошибка загрузки', err);
        }
    }

    const removeProject = async (id) => {
    if (!confirm('Удалить проект?')) return;
        try {
            console.log('Удаляем id:', id);

            await axios.delete(`http://localhost:3000/api/projects/${id}`);
            projects.value = projects.value.filter(p => p.id !== id);

            alert('Проект удалён');
        } catch (err) {
            console.error('Ошибка при удалении проекта:', err.response?.data || err);
            alert('Не удалось удалить проект');
        }
    };

    const editProject = async (project) => {
        try {
            await axios.put(`http://localhost:3000/api/projects/${project.id}`, {
            name: project.name,
            descr: project.descr,
            linkSite: project.linkSite,
            linkGit: project.linkGit,
            category_id: project.category_id
            });

            editingId.value = null;
            alert('Проект обновлён');
        } catch (err) {
            console.error(err);
            alert('Ошибка при обновлении');
        }
    }

    onMounted(() => {
        fetchCategories();
        fetchProjects();
    });
</script>

<style lang="scss" scoped>

</style>