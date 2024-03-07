<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="input-container">
                    <label>姓名：</label>
                    <el-input type="text" v-model="searchKeyword" placeholder="请输入关键词" />
                </div>
            </el-col>
            <el-col :span="6">
                <div class="input-container">
                    <label>登陆状态：</label>
                    <el-select placeholder="登录状态" />
                </div>
            </el-col>
            <el-col :span="4">
                <el-button @click="fetchUsers" type="primary">查询</el-button>
            </el-col>
        </el-row>
        <el-table :data="users" style="width: 100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column sortable prop="id" label="ID" width="180"></el-table-column>
            <el-table-column label="姓名">
                <template #default="{ row }">
                    <div style="display: flex; align-items: center;">
                        <!-- 圆形头像 -->
                        <div class="avatar">
                            {{ row.name.slice(-2) }}
                        </div>
                        {{ row.name }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref, defineEmits, onMounted, watch, toRefs } from 'vue'
import { User, userApi } from '../api/user'

const emits = defineEmits(['selected-user-change'])

const searchKeyword = ref<string>('')
const users = ref<User[]>([])
const props = defineProps(['orgId'])
const { orgId } = toRefs(props) as { orgId: Ref<string> }

const fetchUsers = debounce(async () => {
    try {
        const userData = await userApi.query({
            name: searchKeyword.value,
            orgId: orgId!.value
        });
        users.value = userData;
    } catch (error) {
        console.error(error);
    }
}, 500);

// 组件初始化时加载用户数据
onMounted(async () => {
    await fetchUsers()
})

watch(orgId, fetchUsers)

// 防抖函数
function debounce(func: Function, delay: number) {
    let timer: NodeJS.Timeout | null = null;
    return function (...args: any[]) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
</script>

<style scoped>
.avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #409EFF;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    font-size: 12px;
}

.input-container {
    display: flex;
    align-items: center;
}

.input-container label {
    margin-right: 5px;
    white-space: nowrap;
}
</style>