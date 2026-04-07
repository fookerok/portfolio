<template>
    <header class="header p-2">
        <div class="header-wrapper flex justify-between p-4 bg-white rounded-xl items-center">
            <div class="menu-home flex gap-4">
                <button class="cursor-pointer">
                    <a href="/"><SvgIcon width="24px" height="24px" icon="#burger"/></a>
                </button>
                <nav class="nav">
                    <ul class="flex gap-4">
                        <li class="" v-for="item in menuCMS" :key="item.id">
                            <router-link :to="item.link" class="flex justify-between items-center">
                            {{ item.title }}  
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <button @click="logout" type="submit" class="cursor-pointer btn-exit" id="btn-close">Выйти</button>
        </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const menuCMS = ref([
    {
        id:'1', 
        title: 'Проекты', 
        link: '/admin/projects', 
        icon:'#project'
    },
    {
        id:'2', 
        title: 'Общая информация', 
        link: '/admin/info', 
        icon:'#project'
    },
    {
        id:'4', 
        title: 'Соц сети', 
        link: '/admin/projects', 
        icon:'#project'
    }

])
</script>

<style lang="scss" scoped>
.btn-exit{
    background-color: rgb(242, 76, 76);
    padding: 5px 13px;
    border-radius: 12px;
    color: white;
}
</style>