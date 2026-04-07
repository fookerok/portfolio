<template>
    <div class="admin-layout flex">
        <div class="main-container">
            <DefHeader />
            <main class="content">
                <router-view /> 
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script setup>
import DefHeader from '../components/layouts/DefHeader.vue';
</script>

<style lang="scss" scoped>
.admin-layout {
  min-height: 100vh;
}

.main-container {
  flex-grow: 1; 
  display: flex;
  flex-direction: column;
}

.content {
  padding: 20px;
  overflow-y: auto;
}
</style>