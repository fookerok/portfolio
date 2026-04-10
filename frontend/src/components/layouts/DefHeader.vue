<template>
    <header class="header p-2">
        <div class="header-wrapper flex justify-between p-4 bg-white rounded-xl items-center">
            <div class="menu-home flex gap-4 items-center">
                <router-link to="/" class="logo">H</router-link>
                <button class="cursor-pointer burger"  @click.stop="toggleMenu">
                    <SvgIcon width="24px" height="24px" icon="#burger"/>
                </button>
                <nav class="nav" :class="{ open: isMenuOpen }">
                    <ul class="flex gap-4">
                        <li v-for="item in menuCMS" :key="item.id">
                            <router-link 
                                :to="item.link"
                                @click="closeMenu"
                            >
                                {{ item.title }}
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <button @click="logout" class="cursor-pointer btn-exit">
                Выйти
            </button>
        </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const menuCMS = ref([
    { id:'1', title: 'Проекты', link: '/admin/projects' },
    { id:'2', title: 'Общая информация', link: '/admin/info' },
    { id:'3', title: 'Соц сети', link: '/admin/social' },
])

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleClickOutside = (e) => {
  const nav = document.querySelector('.nav')
  const burger = document.querySelector('.burger')

  if (
    nav &&
    burger &&
    !nav.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.logo {
    font-weight: bold;
    font-size: 18px;
}

.btn-exit {
    background-color: rgb(242, 76, 76);
    padding: 5px 13px;
    border-radius: 12px;
    color: white;
}

.nav {
    display: block;
}

.burger{
    display: none;
}

@media (max-width: 562px) {
    .burger {
        display: block;
    }
    .nav {
        display: none;
        position: absolute;
        top: 66px;
        left: 8px;
        right: 8px;
        background: white;
        padding: 16px;
        border-radius: 0 0 12px 12px;
        z-index: 100;
        box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.1);
    }
    .nav.open {
        display: block;
        animation: fadeIn 0.2s ease;
    }

    .nav ul {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>