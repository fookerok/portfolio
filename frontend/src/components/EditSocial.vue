<template>
  <form @submit.prevent="submitProject">
    <div class="overflow-x-auto bg-white rounded-xl shadow-sm">
        <div v-for="field in fields" :key="field.id" class="form-group flex flex-col">
          <label class="text-lg font-bold bg-gray-50 border-b border-gray-200 py-1 px-2" :for="field.id">{{ field.label }}</label>
          <input
          class="font-semibold p-2 focus:outline-none"
          v-model="settings[field.key]" 
          :id="field.id" 
          :name="field.id"
          type="text" 
          required
          >
        </div>
    </div>
    <div class="form-group my-4 mx-2">
    <button 
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition cursor-pointer" 
        @click="saveSettings" 
        type="submit">
        Сохранить
    </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const settings = ref({
  link_tg: '',
  link_git: ''
});

const fields = [
  { key: 'link_tg', label: 'Ссылка на тг:', id: 'linkSite' },
  { key: 'link_git', label: 'Ссылка на гитхаб:', id: 'linkGit' }
];

const fetchSettings = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/settings`);
    if (res.data) {
      settings.value = res.data;
      document.title = settings.value.site_title;
    }
  } catch (err) {
    console.error('Ошибка при получении настроек:', err);
  }
};

const saveSettings = async () => {
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/settings`, settings.value);
    document.title = settings.value.site_title;
    alert('Настройки успешно сохранены!');
  } catch (e) {
    console.error('Ошибка при сохранении:', e);
    alert('Не удалось сохранить настройки.');
  }
};

onMounted(()=>{
    fetchSettings();    
})
</script>

<style lang="scss" scoped>

</style>