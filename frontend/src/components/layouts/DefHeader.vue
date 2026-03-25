<template>
    <header class="header p-2">
        <div class="header-wrapper flex justify-between p-4 bg-amber-500 rounded-xl items-center">
            <button class="btn-open cursor-pointer">
                <SvgIcon width="24px" height="24px" icon="#burger"/>
            </button>
            <h1 class="title text-xl">
                <a href="/">
                    Моё портфолио CMS
                </a>
            </h1>
            <button @click="logout" type="submit" class="cursor-pointer btn-exit" id="btn-close">Выйти</button>
        </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.btn-exit{
    background-color: rgb(242, 76, 76);
    padding: 5px 13px;
    border-radius: 12px;
    color: white;
}
</style>