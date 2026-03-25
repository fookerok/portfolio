<template>
    <div class="overflow-x-auto bg-white rounded-xl shadow-sm">
         <form @submit.prevent="submitProject">

            <div class="form-group">
                <label for="name">Название сайта</label>
                <input v-model="settings.site_title" type="text" name="name" id="name" required>
            </div>

            <div class="form-group">
                <label for="name">Заголовок</label>
                <input v-model="settings.site_name" type="text" name="name" id="name" required>
            </div>

            <div class="form-group">
                <label for="descr">Описание</label>
                <input v-model="settings.site_description" type="text" name="descr" id="descr" required>
            </div>

            <div class="form-group">
                <label for="linkSite">Ссылка на тг</label>
                <input v-model="settings.link_tg" type="text" name="linkSite" id="linkSite" required>
            </div>

            <div class="form-group">
                <label for="linkGit">Ссылка на гитхаб</label>
                <input v-model="settings.link_git" type="text" name="linkGit" id="linkGit" required>
            </div>
            <div class="form-group">
                <button @click="saveSettings" type="submit">Сохранить</button>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const settings = ref({
  site_title: '',
  site_name: '',
  site_description: '',
  link_tg: '',
  link_git: ''
});

const fetchSettings = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/settings');
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
    await axios.put('http://localhost:3000/api/settings', settings.value);
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