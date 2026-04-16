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
          required>
      </div>
      <div class="form-group flex flex-col">
        <label class="text-lg font-bold bg-gray-50 border-b border-gray-200 py-1 px-2">
          Фотография
        </label>
        <div v-if="hasImage" class="mb-4">

          <div class="overflow-hidden mb-2 py-1 px-2">
            <img
              :src="preview || imageUrl"
              class="w-full max-h-[350px] object-cover rounded-xl"
            />
          </div>

          <div class="flex gap-2">
            <label class="cursor-pointer inline-block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
              🔄 Заменить фото
              <input
                type="file"
                class="hidden"
                @change="handleFileChange"
              />
            </label>

            <button
              type="button"
              class="cursor-pointer btn-exit !px-4 !py-2"
              @click="removeImage"
            >
              🗑 Удалить
            </button>
          </div>

        </div>
        <div
          v-else
          class="border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer"
          :class="isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'"
          @click="$refs.fileInput.click()"
          @dragover.prevent="isDragOver = true"
          @dragleave.prevent="isDragOver = false"
          @drop.prevent="handleDrop"
        >
          <div class="flex flex-col items-center justify-center text-gray-600">
            <span class="text-2xl mb-2">📷</span>
            <span class="font-medium">Перетащите фото или нажмите</span>
            <span class="text-sm text-gray-400 mt-1">PNG, JPG до 10MB</span>
          </div>

          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept="image/*"
            @change="handleFileChange"
          />
        </div>
      </div>
    </div>
    <div class="form-group my-4 mx-2">
      <button 
      class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition cursor-pointer" 
      @click="saveSettings" 
      type="submit">Сохранить</button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const fileInput = ref(null);
const isDragOver = ref(false);

const settings = ref({
  site_title: '',
  site_name: '',
  site_description: ''
});

const file = ref(null);
const preview = ref(null);
const fileName = ref('');
const imageUrl = ref(null);

const hasImage = computed(() => {
  return !!(preview.value || imageUrl.value);
});

const fields = [
  { key: 'site_title', label: 'Название сайта:', id: 'title' },
  { key: 'site_name', label: 'Заголовок:', id: 'name' },
  { key: 'site_description', label: 'Описание:', id: 'descr' },
];

const openFileDialog = () => {
  fileInput.value?.click();
};

const processFile = (selectedFile) => {
  if (!selectedFile) return;

  // очистка старого preview
  if (preview.value) {
    URL.revokeObjectURL(preview.value);
  }

  file.value = selectedFile;
  preview.value = URL.createObjectURL(selectedFile);
  fileName.value = selectedFile.name;
};

const handleFileChange = (e) => {
  const selectedFile = e.target.files?.[0];
  processFile(selectedFile);
};

const handleDrop = (e) => {
  isDragOver.value = false;

  const fileDropped = e.dataTransfer.files?.[0];
  processFile(fileDropped);
};

const fetchSettings = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/settings`);

  settings.value = res.data;

  imageUrl.value = res.data.image
    ? `${import.meta.env.VITE_API_URL}${res.data.image}`
    : null;

  preview.value = null;
  file.value = null;
  fileName.value = '';
};

const saveSettings = async () => {
  try {
    const formData = new FormData();

    for (const key in settings.value) {
      formData.append(key, settings.value[key]);
    }

    if (file.value) {
      formData.append('image', file.value);
    }

    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/settings`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    imageUrl.value = res.data.image
      ? `${import.meta.env.VITE_API_URL}${res.data.image}`
      : null;

    preview.value = null;
    file.value = null;

    document.title = settings.value.site_title;
    alert('Настройки успешно сохранены!');
  } catch (e) {
    console.error(e);
    alert('Не удалось сохранить настройки.');
  }
};

const removeImage = async () => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/settings/image`);

    preview.value = null;
    imageUrl.value = null;
    file.value = null;
    fileName.value = '';
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchSettings();
});
</script>

<style lang="scss" scoped>

</style>