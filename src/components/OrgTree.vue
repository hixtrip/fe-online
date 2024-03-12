<template>
    <div class="orgList_box">
        <div class="list_top">
            <div>全部</div>
            <div class="add" @click="handleAdd">+</div>
        </div>
        <div class="tree_box"><Tree :list="list"></Tree></div>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    list: {
        type: Array,
        value: []
    }
})

const emit = defineEmits(['handleAdd'])

const handleAdd = () => {
    emit('handleAdd')
}
watch(() => props.list, (newval) => {
    console.log(newval);
})


</script>

<style scoped>
.orgList_box {
    min-width: 300px;
    border-right: 1px solid #ccc;
    position: relative;
    display: flex;
    flex-direction: column;
}
.tree_box {
    padding-right: 12px;
    overflow: auto;
    flex: 1;
    height: 50%;
}
.list_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    font-size: 15px;
    border-bottom: 1px solid #ccc;
    height: 52px;
}
.add {
    font-size: 26px;
    cursor: pointer;
    font-weight: bold;
}

</style>