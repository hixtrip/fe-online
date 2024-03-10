<template>
  <div>
    <div class="search-box">
      <input
        type="text"
        v-model="searchId"
        @input="debounceSearch"
        placeholder="Search by ID"
      />
      <input
        type="text"
        v-model="searchName"
        @input="debounceSearch"
        placeholder="Search by Name"
      />
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td v-for="(value, index) in row" :key="index">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import userApi from "../api/user"
import { debounce } from "../utils/tool"
const searchId = ref("")
const searchName = ref("")
const orgId = ref("0")

type dataItem = {
  id: string
  name: string
}

const debounceSearch = debounce(async () => {
  const res = await userApi.query({
    id: searchId.value,
    name: searchName.value,
  })
  data.value = res
}, 300)

const headers = ref(["id", "name"])
const data = ref([] as dataItem[])
const getList = async (id = orgId.value) => {
  const res = await userApi.query({ orgId: id })
  data.value = res
}
getList()

defineExpose({ getList })
</script>

<style scoped>
table {
  margin-top: 30px;
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}
.search-box {
  display: flex;
  gap: 30px;
}
</style>
