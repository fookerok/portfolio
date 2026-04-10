<template>
  <div class="flex flex-col lg:flex-row gap-4">
    <div class="lg:w-1/2 w-full overflow-x-auto bg-white rounded-xl shadow-sm p-4">
      <form @submit.prevent="submitProject" class="space-y-4">

        <div class="grid grid-cols-[68px_1fr] items-center gap-2">
          <label class="text-sm font-medium">Категория</label>
          <select
            v-model="project_category_id"
            class="bg-slate-100 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-0"
            required
          >
            <option v-for="category of categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-[68px_1fr] items-center gap-2">
          <label class="text-sm font-medium">Название</label>
          <input v-model="name" class="bg-slate-100 w-full border rounded-lg px-3 py-2 text-sm" type="text" required />
        </div>

        <div class="grid grid-cols-[68px_1fr] items-center gap-2">
          <label class="text-sm font-medium">Описание</label>
          <input v-model="descr" class="bg-slate-100 w-full border rounded-lg px-3 py-2 text-sm" type="text" required />
        </div>

        <div class="grid grid-cols-[68px_1fr] items-center gap-2">
          <label class="text-sm font-medium">Ссылка</label>
          <input v-model="linkSite" class="bg-slate-100 w-full border rounded-lg px-3 py-2 text-sm" type="text" />
        </div>

        <div class="grid grid-cols-[68px_1fr] items-center gap-2">
          <label class="text-sm font-medium">Git</label>
          <input v-model="linkGit" class="bg-slate-100 w-full border rounded-lg px-3 py-2 text-sm" type="text" />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="text-green-600 cursor-pointer border rounded-lg px-4 py-2 text-sm hover:translate-y-[-1px] transition">Добавить</button>
        </div>
      </form>
    </div>
    <div class="lg:w-1/2 w-full overflow-x-auto bg-white rounded-xl shadow-sm p-4">
      <form @submit.prevent="submitCategory" class="mb-4">
        <div class="grid grid-cols-[68px_auto_96px] items-center gap-2">
          <label class="text-sm font-medium">Название</label>
          <input
            v-model="newCategory"
            type="text"
            class="bg-slate-100 w-full border rounded-lg px-3 py-2 text-sm"
          />
          <button type="submit" class="text-green-600 cursor-pointer border rounded-lg px-4 py-2 text-sm hover:translate-y-[-1px] transition">Добавить</button>
        </div>
      </form>
      <form @submit.prevent="deleteCategory">
        <div class="grid grid-cols-[68px_auto_96px] items-center gap-2">
          <label class="text-sm font-medium">Категория</label>
          <select
            v-model="delete_category_id"
            class="bg-slate-100 w-full border rounded-lg px-3 py-2 text-sm"
            required
          >
            <option v-for="category of categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <button type="submit" class="delete-btn cursor-pointer border rounded-lg px-4 py-2 text-sm hover:translate-y-[-1px] transition">Удалить</button>
        </div>
      </form>

    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const categories = ref([]);

const name = ref('');
const descr = ref('');
const linkSite = ref('');
const linkGit = ref('');

const project_category_id = ref('');
const delete_category_id = ref('');

const newCategory = ref('');
const fetchCategories = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    categories.value = res.data;
  } catch (err) {
    console.error('Ошибка загрузки категорий', err);
  }
};

const submitProject = async () => {
  if (!project_category_id.value || !name.value || !descr.value) {
    alert('Заполните все обязательные поля!');
    return;
  }

  try {
    const payload = {
      name: name.value,
      descr: descr.value,
      linkSite: linkSite.value,
      linkGit: linkGit.value,
      project_category_id: Number(project_category_id.value) || null
    };

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/projects`, payload);

    alert(`Проект "${res.data.name}" добавлен!`);

    name.value = '';
    descr.value = '';
    linkSite.value = '';
    linkGit.value = '';
    project_category_id.value = '';

  } catch (err) {
    console.error('Ошибка при добавлении проекта', err.response?.data || err);
    alert('Не удалось добавить проект');
  }
};

const submitCategory = async () => {
  if (!newCategory.value) {
    alert('Введите название категории');
    return;
  }
  try {
    const payload = {
      name: newCategory.value
    };

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/categories`,
      payload
    );

    alert(`Категория "${res.data.name}" добавлена!`);

    newCategory.value = '';

    fetchCategories();

  } catch (err) {
    console.error('Ошибка при добавлении категории', err.response?.data || err);
    alert('Не удалось добавить категорию');
  }
};

const deleteCategory = async () => {
  if (!delete_category_id.value) {
    alert('Выберите категорию');
    return;
  }
  if (!confirm('Удалить категорию?')) return;
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/categories/${delete_category_id.value}`
    );

    alert('Категория удалена');

    delete_category_id.value = '';
    fetchCategories();

  } catch (err) {
    console.error('Ошибка при удалении категории', err.response?.data || err);
    alert('Не удалось удалить категорию');
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style lang="scss" scoped>
textarea{
    max-height: 46.5px;
}
:deep(input),
:deep(select),
:deep(textarea) {
  border: none;

  &:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
}
</style>