<template>
   <ul>
        <li 
            v-for="item in list" 
            :key="item[key]"
            @click="(e) => handleItem(e, item)"
            class="tree_item"
        >
            <div :class="`tree_name ${appStoreData.treeItem.id === item.id ? 'active' : ''}`">{{ item.name }}</div>
            <template v-if="item.children && item.children.length">
                <Tree :list="item.children"></Tree>
            </template>
        </li>
   </ul>
</template>

<script setup>
import { appStore } from '../store/app'
const appStoreData = appStore()
const props = defineProps({
    list: {
        type: Array,
        value: []
    },
    key: {
        type: String,
        value: 'id'
    }
})

const handleItem = (e, item) => {
    e.stopPropagation()
    appStoreData.treeItem = {...item, time: new Date().getTime()}
}
</script>

<style scoped>
.tree_item {
    cursor: pointer;
}
.tree_name {
    color: #333;
    font-size: 13px;
    transition: all 0.2s;
    padding: 6px 0 6px 6px;
}
.active {
    color: #69a7f4;
    background: rgba(105, 167, 244, 0.1);
}
</style>