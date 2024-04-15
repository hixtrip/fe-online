<template>
    <el-tree
        :data="treeData.value"
        :props="defaultProps"
        ref="treeRef"
        node-key="id"
        :current-node-key="current"
        @node-click="handleNodeClick"
        highlight-current
    />
</template>
<script lang="ts" setup>
import { ref,reactive,onMounted,nextTick } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import orgApi from '@/api/org'
import mitter from '@/utils/eventBus'
import { throttle } from '@/utils/index'
interface Tree {
    name: string
    id: string
    children?: Tree[]
}
let treeData = reactive([]);
const defaultProps = {
    children: 'children',
    label: 'name',
}
const treeRef = ref(null);
const current = ref(null);

onMounted(() => {
    orgApi.query('1').then((res)=>{
        treeData.value = res;
        nextTick(()=>{
            treeRef.value.setCurrentKey(res[0].id)
            current.value = res[0].id
        })
    })
});
/* 树点击事件 */
const handleNodeClick = (data: Tree) => {
    let selOrg = {...data};
    if(current.value !== selOrg.id){
        /* 不同节点替换请求 */
        current.value = selOrg.id;
        mitter.emit('selOrg',selOrg)
    }else{
        /* 同节点节流 */
        usrThrottle(selOrg)
    }
}
/* 使用节流 */
const usrThrottle = throttle((selOrg)=>{
    mitter.emit('selOrg',selOrg)
},10000)
</script>
<style scoped>

</style>
  