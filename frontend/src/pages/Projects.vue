<template>
    <Admin>
        <div class="projects-list">
            <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Мои проекты</h2>
                <router-link 
                    to="/admin/projects/add" 
                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                    + Добавить
                </router-link>
            </div>
            <div class="w-full overflow-x-auto bg-white rounded-xl shadow-sm">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="p-4 font-semibold text-gray-600 whitespace-nowrap">Категория</th>
                            <th class="px-1 py-4 font-semibold text-gray-600 whitespace-nowrap">Название</th>
                            <th class="px-1 py-4 font-semibold text-gray-600 whitespace-nowrap">Описание</th>
                            <th class="px-1 py-4 font-semibold text-gray-600 whitespace-nowrap">Сайт</th>
                            <th class="px-1 py-4 font-semibold text-gray-600 whitespace-nowrap">Репозиторий</th>
                            <th class="p-4 font-semibold text-gray-600 whitespace-nowrap">Действия</th>
                        </tr>
                    </thead>

                    <tbody>
                    <tr 
                    v-for="project in projects" 
                    :key="project.id" 
                    class="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                        <td class="p-4 font-medium whitespace-nowrap">
                            <span v-if="editingId !== project.id">{{project.category}}</span>
                            <select v-else v-model="project.category_id" class="border p-1 w-full">
                                <option v-for="category of categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </td>

                        <td class="px-1 py-4 min-w-[150px]">
                            <span v-if="editingId !== project.id">{{ project.name }}</span>
                            <input v-else v-model="project.name" class="border p-1 w-full" />
                        </td>

                        <td class="px-1 py-4 min-w-[250px]">
                            <span v-if="editingId !== project.id" class="line-clamp-2">
                                {{ project.descr }}
                            </span>
                            <textarea v-else v-model="project.descr" class="border p-1 w-full"></textarea>
                        </td>

                        <td class="px-1 py-4 min-w-[80px] break-all">
                            <a v-if="editingId !== project.id" :href="project.linkSite" target="_blank" class="text-blue-600">
                                Link
                            </a>
                            <input v-else v-model="project.linkSite" class="border p-1 w-full" />
                        </td>

                        <td class="px-1 py-4 min-w-[80px] break-all">
                            <a v-if="editingId !== project.id" :href="project.linkGit" target="_blank" class="text-blue-600">
                                Git
                            </a>
                            <input v-else v-model="project.linkGit" class="border p-1 w-full" />
                        </td>

                        <td class="p-4 whitespace-nowrap">
                            <div class="flex flex-col" v-if="editingId === project.id">
                                <button class="text-green-600 cursor-pointer" @click="editProject(project)">Сохранить</button>
                                <button class="delete-btn cursor-pointer" @click="editingId = null">Отмена</button>
                            </div>

                            <div class="flex flex-col gap-1" v-else>
                                <button class="text-green-600 cursor-pointer" @click="editingId = project.id">
                                    Изменить
                                </button>
                                <button class="delete-btn cursor-pointer" @click="removeProject(project.id)">
                                    Удалить
                                </button>
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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
        categories.value = res.data;
    } catch (err) {
        console.error('Ошибка загрузки категорий', err);
    }
    };

    const fetchProjects = async () =>{
        try{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
            projects.value = res.data;
        } catch (err){
            console.error('Ошибка загрузки', err);
        }
    }

    const removeProject = async (id) => {
    if (!confirm('Удалить проект?')) return;
        try {
            console.log('Удаляем id:', id);

            await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`);
            projects.value = projects.value.filter(p => p.id !== id);

            alert('Проект удалён');
        } catch (err) {
            console.error('Ошибка при удалении проекта:', err.response?.data || err);
            alert('Не удалось удалить проект');
        }
    };

    const editProject = async (project) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/projects/${project.id}`, {
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