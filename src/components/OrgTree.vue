<template>
    <el-tree :data="orgTreeData" @node-click="handleNodeClick" lazy :load="loadNode" node-key="id"
        :props="{ children: 'children', label: 'name' }" highlight-current :current-node-key="currentNodeId">

        <template #default="{ node }">
            <span>
                <el-icon>
                    <Stamp />
                </el-icon>
                {{ node.label }}
            </span>
        </template>
    </el-tree>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted } from 'vue'
import { Org, orgApi } from '../api/org'

const emits = defineEmits(['selected-org-change'])

const selectedNodeId = ref<string | null>(null)
const currentNodeId = '1';
const orgTreeData = ref<Org[]>([])

// 异步加载节点数据
async function loadNode(node: any, resolve: any) {
    try {
        const children = await orgApi.query(node.data.id)
        resolve(children)
    } catch (error) {
        resolve([])
    }
}

// 处理节点点击事件
function handleNodeClick(data: any) {
    selectedNodeId.value = data.id
    emits('selected-org-change', selectedNodeId.value)
}

// 组件初始化时加载根节点数据
onMounted(async () => {
    try {
        const rootData = await orgApi.query('0')
        orgTreeData.value = rootData
    } catch (error) {
        console.error(error)
    }
})
</script>
