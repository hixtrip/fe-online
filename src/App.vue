<template>
    <section style="padding: 0 10px 0 10px">
        <el-tabs v-model="currentTab">
            <el-tab-pane
                v-for="tab in tabs"
                :label="tab.name"
                :name="tab.value"
            >
                <div class="flex">
                    <org-tree
                        @department-changed="(e) => updateTable(e)"
                    ></org-tree>
                    <section class="flex-1">
                        <el-breadcrumb separator="/" class="my-10px px-5px">
                            <el-breadcrumb-item
                                v-for="breadcrumb in breadcrumbStore.getBreadcrumb"
                            >
                                {{ breadcrumb }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                        <user-table ref="userTableRef"></user-table>
                    </section>
                </div>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script setup lang="ts">
import type { OrgTree } from './api/types'
import { useBreadcrumbStore } from './store'
const tabs = [
    { name: '成员管理', value: 'member' },
    { name: '团队管理', value: 'team' },
    { name: '职位维护', value: 'position' },
]

const currentTab = ref('member')
const breadcrumbStore = useBreadcrumbStore()

const userTableRef = ref(null)
const updateTable = (e: OrgTree) => {
    const table = userTableRef.value![0]!
    nextTick(() => {
        // @ts-ignore
        // 不知道vue改啥了，组件ref变成数组了
        table.update(e.id)
    })
}
</script>

<style lang="css" scoped>
.head {
    padding: 0;
    margin: 0;
    border-bottom: 1px inset var(--ex-light-border);
    position: relative;
    .options {
        display: inline-block;
        list-style: none;
        cursor: pointer;
        margin: 0 15px 0 15px;
        padding: 12px 0 12px 0;
    }
    .options.active {
        color: var(--primary-color);
    }
    .underline {
        position: absolute;
        bottom: 0;
        left: 20px;
        height: 2px;
        width: 100px;
        color: var(--primary-color);
        z-index: 1;
    }
}
::v-deep(.el-tabs__header) {
    margin-bottom: 0;
}
</style>
