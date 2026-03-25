<template>
    <div class="p-2 aside-wrapper">
        <aside class="aside sticky top-0 p-4 bg-amber-500 rounded-xl items-center">
            <nav class="nav">
                <ul class="flex flex-col gap-4 text-lg">
                    <li class="w-full" v-for="item in menuCMS" :key="item.id">
                        <router-link :to="item.link" class="flex justify-between items-center">
                        <span>{{ item.title }}</span> 
                            <SvgIcon :icon="`${item.icon}`" width="24px" height="24px"/>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </aside>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
        id:'3', 
        title: 'Фотография страницы', 
        link: '/admin/photo', 
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
    .aside-wrapper {
        width: 260px;
        min-width: 260px;
    }

    .aside{
        height: 100%;
    }
</style>