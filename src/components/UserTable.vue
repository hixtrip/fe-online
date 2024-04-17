<script setup lang="ts">
import { ref, toRef, watch } from 'vue'
import userApi from '@/api/user'
import { User, UserQueryParams } from '@/types/user'
import { useDebounced } from '@/hooks/useDebounced'
import { state } from '@/state'

const orgId = toRef(state, 'orgId')
const queryParams = ref<UserQueryParams>({
  name: '',
  orgId: orgId.value,
})
const userList = ref<User[]>([])

async function fetchData() {
  const data = await userApi.query(queryParams.value)
  console.log('user params: ', queryParams.value)
  userList.value = data
}

// fetchData();

const debouncedSearch = useDebounced(fetchData, 300)

watch(
  () => orgId.value,
  (value, _) => {
    queryParams.value.orgId = value
    debouncedSearch()
  }
)
</script>

<template>
  <div class="main-container">
    <div class="crumb">
      {{ state.selectedMenu.parentName }}
      <template v-if="state.selectedMenu.childName">
        / {{ state.selectedMenu.childName }}
      </template>
    </div>
    <input
      class="search-input"
      type="text"
      v-model="queryParams.name"
      placeholder="搜索"
      @keyup.enter="debouncedSearch"
    />
    <table class="ui-table">
      <thead>
        <th>ID</th>
        <th>姓名</th>
      </thead>
      <tbody>
        <template v-if="userList.length">
          <tr v-for="item in userList" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="2">无数据</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.main-container {
  padding: 20px;
}
.search-input {
  margin-bottom: 20px;
}
.ui-table {
  border-collapse: collapse;
  border-top: 1px solid var(--table-border-color);
  border-left: 1px solid var(--table-border-color);
}
.ui-table th,
.ui-table td {
  padding: 5px 10px;
  border-right: 1px solid var(--table-border-color);
  border-bottom: 1px solid var(--table-border-color);
  text-align: left;
}
.ui-table th {
  border-bottom-width: 2px;
}
</style>
