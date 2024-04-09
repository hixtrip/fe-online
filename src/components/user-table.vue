<template>
    <div>
        <div class="flex items-center">
            <el-select
                v-model="selected"
                placeholder="搜索（win + G）"
                style="width: 240px"
            >
                <el-option
                    v-for="item in tableData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                />
            </el-select>
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ state }}
                    <span class="i-ep:arrow-down"></span>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="item in options">
                            <div @click="handleClick(item)">
                                {{ item }}
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            {{ tableData.length + '个成员' }}
        </div>
        <el-table :data="tableData">
            <el-table-column
                v-for="(key, index) in columns"
                :label="key"
                :prop="key"
                :key="index"
                :width="200"
            ></el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import type { User } from '../api/types'
import userApi from '../api/user'
const selected = ref()
const tableData = ref<User[]>([])
const columns = ref<string[]>([])

const options = ['登录状态', '在线时间']
const state = ref<string>(options[0])

const update = async () => {
    const data = await userApi.query()
    if (data.length >= 0) {
        tableData.value = data
        columns.value = Object.keys(data[0])
    }
}

const handleClick = (e: string) => {
    console.log(e)

    state.value = e
}

update()

defineExpose({
    update,
})
</script>

<style lang="scss" scoped></style>
