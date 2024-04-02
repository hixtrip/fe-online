<template>
    <div class="ui">
        <Li v-for="item in ulData" :key="item.id" :liData="item"></Li>
    </div>
</template>

<script lang="ts" setup>
import Li from './li.vue'
import {ref} from 'vue';
import { onMounted } from 'vue'
const props =defineProps({
    ulData:Array
})

const ulData = ref(props.ulData);

onMounted(()=>{
    
})
</script>