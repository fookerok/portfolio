<template>
    <div class="overflow-x-auto bg-white rounded-xl shadow-sm">
         <form @submit.prevent="submitProject">

            <div class="form-group">
                <label for="category">Категория</label>
                <select v-model="category_id" name="category" id="category" required>
                    <option v-for="category of categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="name">Название</label>
                <input v-model="name" type="text" name="name" id="name" required>
            </div>

            <div class="form-group">
                <label for="descr">Описание</label>
                <input v-model="descr" type="text" name="descr" id="descr" required>
            </div>

            <div class="form-group">
                <label for="linkSite">Ссылка на проект</label>
                <input v-model="linkSite" type="text" name="linkSite" id="linkSite" required>
            </div>

            <div class="form-group">
                <label for="linkGit">Ссылка на репозиторий</label>
                <input v-model="linkGit" type="text" name="linkGit" id="linkGit" required>
            </div>

            <div class="form-group">
                <button type="submit">Добавить</button>
            </div>

        </form>
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
const category_id = ref('');

const fetchCategories = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/categories');
    categories.value = res.data;
  } catch (err) {
    console.error('Ошибка загрузки категорий', err);
  }
};

onMounted(() => {
  fetchCategories();
});

const submitProject = async () => {
  if (!category_id.value || !name.value || !descr.value) {
    alert('Заполните все обязательные поля!');
    return;
  }

  try {
    const payload = {
      name: name.value,
      descr: descr.value,
      linkSite: linkSite.value,
      linkGit: linkGit.value,
      category_id: Number(category_id.value) || null
    };

    const res = await axios.post('http://localhost:3000/api/projects', payload);

    alert(`Проект "${res.data.name}" добавлен!`);

    name.value = '';
    descr.value = '';
    linkSite.value = '';
    linkGit.value = '';
    category_id.value = '';

  } catch (err) {
    console.error('Ошибка при добавлении проекта', err.response?.data || err);
    alert('Не удалось добавить проект');
  }
};
</script>

<style lang="scss" scoped>

</style>