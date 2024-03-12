<template>
    <div class="tab_box">
        <div v-for="item in options"  :key="item.key" @click="handleTabKey(item.key)">
            <div :class="`tab_item ${actionKey === item.key ? 'tab_active' : ''}`">
                {{ item.value }}
            </div>
        </div>    
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    options: {
        type: Array,
        value: []
    },
    actionKey: {
        type: Number,
        value: 1
    }
})

const emit = defineEmits(['handleTabKey'])

const handleTabKey = (key) => {
    emit('handleTabKey', key);
}


</script>

<style scoped>
.tab_box {
    width: 100%;
    padding: 12px 16px;
    display: flex;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    box-sizing: border-box;
}
.tab_item {
    position: relative;
    padding: 0 4px;
    margin-right: 18px;
    cursor: pointer;
}
.tab_item.tab_active {
    color: #69a7f4;
}
.tab_active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -12px;
    display: inline-block;
    height: 2px;
    background: #69a7f4;
}
</style>