<!-- 组织 -->
<template>
    <div id="orgTree">
        <!-- 头部 -->
        <header class="orgTree-title">
            <div>部门</div>
            <el-icon size="18"><Plus /></el-icon>
        </header>
        <!-- 内容 -->
        <div class="orgTree-menu">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >
                <template v-for="item in menuArr">
                    <!-- 有子节点 -->
                    <template v-if="item.children && item.children.length">
                        <el-sub-menu :index="item.id" v-loading="loading">
                            <template #title>
                                <el-icon><Baseball /></el-icon>
                                <span :title="item.name">{{ item.name }}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item
                                    v-for="son in item.children"
                                    :index="son.id"
                                    @click="handleName(son)"
                                >
                                    <span :title="son.name">{{
                                        son.name
                                    }}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                    </template>
                    <!-- 无子节点 -->
                    <template v-else>
                        <el-menu-item :index="item.id">
                            <el-icon><Baseball /></el-icon>
                            <span :title="item.name">{{ item.name }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import orgApi from '@/api/org';
//
const emit = defineEmits(['childEvent']);
// 数据
let menuArr = ref<any>([]); // 菜单列表
const loading = ref<boolean>(false); // 加载状态
// 方法
// 获取树的数据
orgApi.query('1').then((users: any) => {
    menuArr.value = users;
});
const handleOpen = async (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
    loading.value = true;
    await orgApi.query(key).then((users: any) => {
        menuArr.value = menuArr.value.map((val: any) => {
            if (val.id == key) {
                return { ...val, children: users };
            }
            return val;
        });
    });
    loading.value = false;
};
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
};

// 选中子菜单
const handleName = (e: any) => {
    console.log(e, '-----');

    emit('childEvent', e);
};
</script>

<style scoped lang="scss">
#orgTree {
    width: 100%;
    height: 100%;
    .orgTree-title {
        font-size: 18px;
        padding: 5px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 2px solid #f1f1f1;
    }
    .orgTree-menu {
        height: 100%;
        overflow-y: scroll;
    }
}
.el-menu-vertical-demo {
    height: 100%;
}
</style>
