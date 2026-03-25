<template>
    <div class="form-wrapper flex justify-center items-center">
      <form @submit.prevent="handleLogin" class="p-8 flex flex-col gap-2">
        <h1 class="text-xl mb-2 font-semibold">Введите данные для входа</h1>
        <div class="input-wrapper text-lg flex flex-col gap-2">
          <label for="login">Логин</label>
          <input v-model="login"
          autocomplete="username" 
          required 
          class="bg-slate-100" 
          type="text" 
          name="login" 
          id="login">
        </div>
        <div class="input-wrapper text-lg flex flex-col gap-2">
          <label for="password">Пароль</label>
          <input v-model="password"
          autocomplete="current-password"
          required 
          class="bg-slate-100" 
          id="password" 
          name="password" 
          type="password">
        </div>
        <Button 
        id="btn-send" 
        name="btn-send" 
        type="submit" 
        class="cursor-pointer mt-4 bg-slate-700 py-2.5 text-slate-50 rounded-md">Войти</Button>
      </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const login = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

async function handleLogin() {
    error.value = '';
    try {
        const res = await axios.post('http://localhost:3000/api/auth/login', {
            login: login.value,
            password: password.value
        });
        
        const token = res.data.token;
        localStorage.setItem('token', token);
        router.push('/admin');
    } catch (e) {
        error.value = e.response?.data?.error || 'Ошибка при входе';
        console.error('Login error:', e);
    }
}
</script>

<style lang="scss" scoped>
  .form-wrapper {
    background: #fff;
    width: 600px;
    min-height: 300px;
    border-radius: 20px;
  }

  .input-wrapper{
    input{
      padding: 10px 15px;
      border-radius: 8px;
    }
  }
</style>