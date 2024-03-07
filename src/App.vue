<template>
    <div class="app">
        <div class="home-menu">
          <Menu></Menu>
        </div>
        <div class="home-center">
            <User></User>
        </div>
    </div>
</template>

<script setup lang="ts" name="app">
import Menu from '../src/components/menu.vue';
import User from '../src/components/user.vue';

</script>

<style scoped>
.app{
    display: flex;
}
.home-menu{
    width: 15%;
}
.home-center{
    width: 70%;
}
</style>