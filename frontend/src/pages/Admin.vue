<template>
  <div class="admin-layout">
    <div class="main-container">
      <DefHeader />
      <main class="content">
        <div class="page-wrapper">
          <router-view /> 
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import DefHeader from '../components/layouts/DefHeader.vue';
</script>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  height: 100%;
}

.content {
  flex: 1;
  padding: 8px;
  overflow-y: auto;
  overflow-x: hidden;
}

.page-wrapper {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}
</style>