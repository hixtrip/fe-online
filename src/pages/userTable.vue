<template>
    <div class="flex-col">
        <div class="justify-center">
            <a-input-search style="width: 80%;" v-model:value="searchValue" placeholder="请输入名称..." enter-button
                @change="onSearch" @search="onSearch" />
            <a-table style="margin-top: 10px;" :columns="columns" :data-source="dataSource">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'name'">
                        <span>
                            {{ record.name }}
                        </span>
                    </template>
                    <template v-if="column.key === 'username'">
                        <span>
                            {{ record.name }}
                        </span>
                    </template>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, defineProps, defineExpose, watch } from "vue";

const orgList = ref<any>(inject("orgList"))
const userList = ref<any>(inject("userList"))
const props = defineProps(['flag'])
const columns = [
    {
        key: "name",
        name: "name",
        title: "姓名",
        width: 400,
    },
    {
        key: "username",
        name: "username",
        title: "用户名",
        width: 400,
    },
];
// 搜索内容
const searchValue = ref('')
const dataSource = ref()

const onSearch = () => {
    if (props.flag) {
        dataSource.value = orgList.value.filter((item: any) => { return item.name.includes(searchValue.value) })
    } else {
        dataSource.value = userList.value.filter((item: any) => { return item.name.includes(searchValue.value) })
    }
}
// 侦听searchValue变化，500ms未变化且输入1字符以上查询
const timeCount = ref(0)
watch([props.flag, searchValue.value], () => {
    timeCount.value++;
    const timerId = setTimeout(() => {
        if (timeCount.value == 1 && searchValue.value.length >= 1) {
            onSearch()
        }
        timeCount.value = 0
        clearTimeout(timerId);
    }, 800);
})


defineExpose({ onSearch })
</script>

<style scoped>
.flex-col {
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.justify-center {
    display: flex;
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background-color: #fff;
}
</style>
