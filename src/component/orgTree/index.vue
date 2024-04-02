<template>
    <div class="orgtree">
        <Ul :ulData="orgList" v-if="orgList.length>0"></Ul>
    </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance,ref,watch } from 'vue'
import Ul from './ul.vue'
const props = defineProps({
    orgList:Object
})
const orgList = ref(props.orgList);
watch(props, (newValue) => {
    orgList.value  = newValue.orgList;
});
const Bus = getCurrentInstance()?.proxy?.Bus;
const emit = defineEmits(["change"])
Bus.on("treeChange",(res:number)=>{
    emit("change",res)
})
</script>