<template>
    <main>
        <orgTree @updata:ids="changeIds"/>
        <userTableVue :ids="ids" />
    </main>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import orgTree from './components/orgTree.vue'
import userTableVue from './components/userTable.vue'

const ids = ref<string>('0')

const changeIds = (id) => {
    console.log(id);
    
    ids.value = id
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
</style>

<style scoped>
    main{
        display: flex;
    }
</style>