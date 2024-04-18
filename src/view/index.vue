<!-- 部门模块 -->
<template>
    <div id="department">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                v-for="item in tabsArr"
                :key="item.name"
                :label="item.label"
                :name="item.name"
            >
            </el-tab-pane>
        </el-tabs>
        <component :is="com" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, markRaw } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import userManage from './userManage/index.vue';
import teamManage from './teamManage/index.vue';
import positionManage from './positionManage/index.vue';
// 类型定义
interface TabsArrItem {
    label: string;
    name: string;
}
// 数据
// tabsArr: 标签页数组
const tabsArr = reactive<TabsArrItem[]>([
    { label: '成员管理', name: 'user' },
    { label: '团队管理', name: 'team' },
    { label: '职位维护', name: 'position' },
]);
// com: 动态组件
const com = ref(markRaw(userManage));
// activeName: 当前激活的标签页的 name
const activeName = ref<String>('user');
// 方法
// handleClick: tab 被选中时触发，并动态切换组件
const handleClick = (tab: TabsPaneContext) => {
    switch (tab.props.name) {
        case 'user':
            com.value = markRaw(userManage);
            break;
        case 'team':
            com.value = markRaw(teamManage);
            break;
        case 'position':
            com.value = markRaw(positionManage);
            break;
    }
};
</script>

<style scoped lang="scss">
#department {
    width: 100%;
    height: 100%;
}
:deep(.el-tabs__header) {
    margin: 0;
}
</style>
