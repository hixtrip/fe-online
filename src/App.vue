<template>
    <div id="app">
        <el-container>
            <el-main>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="成员管理" name="1"></el-tab-pane>
                    <el-tab-pane label="团队管理" name="2"></el-tab-pane>
                    <el-tab-pane label="职位维护" name="3"></el-tab-pane>
                </el-tabs>
                <el-row justify="space-between">
                    <el-col :span="5">
                        <div class="department bar">
                            <span>部门</span>
                            <el-icon size="18">
                                <Plus />
                            </el-icon>
                        </div>
                        <OrgTree @selected-org-change="orgChange"></OrgTree>
                    </el-col>
                    <el-col :span="18">
                        <el-breadcrumb class="bar">
                            <el-icon style="margin-right: 10px;">
                                <Stamp />
                            </el-icon>
                            <el-breadcrumb-item> 厦门嗨行旅游 </el-breadcrumb-item>
                            <el-breadcrumb-item> 技术部 </el-breadcrumb-item>
                        </el-breadcrumb>
                        <UserTable :orgId="orgId"></UserTable>
                    </el-col>
                </el-row>
            </el-main>

        </el-container>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OrgTree from './components/OrgTree.vue';
import UserTable from './components/UserTable.vue';

const orgId = ref<string>('1')
const activeName = ref<string>('1')
// 当前节点改变回调
function orgChange(id: string) {
    orgId.value = id
}

</script>

<style scoped>
.bar {
    height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.department {
    justify-content: space-between;
    border-bottom: 1px solid #e4e7ed;
    color: gray;
}
</style>
