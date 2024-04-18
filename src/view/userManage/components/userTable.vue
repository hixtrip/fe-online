<!-- 用户 -->
<template>
    <div id="userTable">
        <header class="userTable-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="fontSize"
                    >厦门嗨行旅行部</el-breadcrumb-item
                >
                <el-breadcrumb-item class="fontSize"
                    >技术部(要求没做 所以做个例子)</el-breadcrumb-item
                >
            </el-breadcrumb>
        </header>
        <div class="userTable-content">
            <div>
                <el-input
                    v-model="searchVal"
                    placeholder="搜索（⌘+G）"
                    :prefix-icon="Search"
                    @input="searchChange"
                />
            </div>
            <div>
                <el-select
                    v-model="statusVal"
                    placeholder="登录状态"
                    style="width: 240px"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <span>{{ tableData.length }}个成员</span>
            </div>
        </div>
        <div>
            <el-table
                ref="multipleTableRef"
                :data="tableData"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" />
                <el-table-column
                    v-for="item in column"
                    sortable
                    :label="item.label"
                    :prop="item.prop"
                >
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref, reactive, watch } from 'vue';
import { debounce } from 'lodash';
// 类型定义
interface options {
    value: String;
    label: String;
}
// 数据
const props = defineProps({
    // 表格数据
    tableArr: {
        type: Array,
        default: () => [],
    },
}); // 接收
const searchVal = ref<String | Number>(''); // 搜索
const statusVal = ref<String | Number>(''); // 登录状态
const options = reactive<options[]>([
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]); // 成员数组
let tableData = ref<any>(props.tableArr); // 表格数据
const tableList = ref<any>([]);
const column = reactive([
    {
        label: '姓名',
        prop: 'name',
    },
    {
        label: '用户名',
        prop: 'id',
    },
]); // 表格列
// 方法
// handleSelectionChange: 表格多选
const handleSelectionChange = (e: any) => {
    console.log(e, 'e');
};
// searchChange : 搜索框方法
const searchChange = debounce((e: String | Number) => {
    tableData.value = tableList.value; // 多做一层处理 数据清空 返回原数据
    tableData.value = tableData.value.filter(
        (item: any) => item.name && item.name.includes(e),
    );
}, 1000);
// watch: 数据监听
watch(
    () => props.tableArr,
    (newVal) => {
        tableData.value = newVal;
        tableList.value = newVal;
    },
    {
        immediate: true, // 立即执行
        deep: true, // 深度监听
    },
);
</script>

<style scoped lang="scss">
#userTable {
    width: 100%;
    height: 100%;
    .userTable-header {
        font-size: 18px;
        padding: 10px 20px;
        align-items: center;
        border: 2px solid #f1f1f1;
        .fontSize {
            font-size: 18px;
        }
    }
    .userTable-content {
        width: 100%;
        display: flex;
    }
}
</style>
