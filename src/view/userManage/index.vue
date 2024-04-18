<!-- 成员管理组件 -->
<template>
    <div id="user-manage">
        <orgTree
            class="department-org"
            @childEvent="handleChildEvent"
        ></orgTree>
        <userTable class="department-user" :tableArr="tableArr"></userTable>
    </div>
</template>

<script setup lang="ts">
import userApi from '@/api/user';
import { throttle } from 'lodash';
import { ref } from 'vue';
// 组件
import orgTree from './components/orgTree.vue'; // 组织
import userTable from './components/userTable.vue'; // 用户
// 类型
interface tableType {
    id: String;
    name: String;
}
// 数据
let tableArr = ref<tableType[]>([]);
// 方法
const handleChildEvent = throttle((data: any) => {
    userApi.query({}).then((users: any) => {
        tableArr.value = users;
        console.log(users, '---', data);
    });
}, 1000);
</script>

<style scoped lang="scss">
#user-manage {
    width: 100%;
    height: 100%;
    display: flex;
    .department-org {
        width: 20%;
        height: 100%;
    }
    .department-user {
        widows: 80%;
        height: 100%;
    }
}
</style>
