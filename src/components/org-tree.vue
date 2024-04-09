<template>
    <div class="min-w-200px">
        <div class="title">
            <span>部门</span>
            <div class="i-ep:plus"></div>
        </div>
        <el-tree-v2
            style="max-width: 600px"
            :data="orgs"
            :props="props"
            :height="208"
            @node-click="(e) => handleNodeClick(e)"
            ref="elTreeRef"
        >
        </el-tree-v2>
    </div>
</template>

<script setup lang="ts">
import type { OrgTree } from '../api/types'
import orgApi from '../api/org'
import { type ElTreeV2 } from 'element-plus'
import { useBreadcrumbStore } from '../store'
const breadcrumbStore = useBreadcrumbStore()

const orgs = ref<OrgTree[]>([])
const props = {
    value: 'id',
    label: 'name',
    children: 'children',
}
const getData = async () => {
    const data = await orgApi.query()
    data.map((res) => {
        return {
            children: undefined,
            ...res,
        }
    })
    orgs.value = data
}
getData()

const elTreeRef = ref<typeof ElTreeV2 | null>(null)

const emit = defineEmits(['department-changed'])
const handleNodeClick = async (e: any | OrgTree) => {
    breadcrumbStore.add(e.name)
    const tree = elTreeRef.value
    if (tree) {
        nextTick(async () => {
            await orgApi
                .query()
                .then((res) => {
                    orgs.value.find((org) => org.id === e.id)!.children = res
                })
                .catch(() => console.error('[org-tree]: 只支持添加1层'))
            tree.setData(orgs.value)
        })
    }
    emit('department-changed', e)
}
</script>

<style lang="css" scoped>
.title {
    border-right: 1px solid var(--el-menu-border-color);
    border-bottom: 1px solid var(--el-menu-border-color);
    display: flex;
    justify-content: space-between;
    padding: 15px 12px 15px 12px;
}
</style>
