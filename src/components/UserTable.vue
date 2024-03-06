<!--
 * @Author: KokoTa
 * @Date: 2024-03-06 17:46:56
 * @LastEditTime: 2024-03-06 20:04:29
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: \fe-online\src\components\UserTable.vue
-->
<template>
  <div class="flex-[8]">
    <header class="flex items-center mb-2">
      <span class="flex-shrink-0">用户名：</span>
      <input class="border indent-1" type="text" @input="(...args) => onInput(args as any)" />
    </header>
    <section>
      <table class="w-full border">
        <tr>
          <th>ID</th>
          <th>NAME</th>
        </tr>
        <tr v-for="user in data" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from 'vue'
import userApi, { User } from '../api/user';
import { debounce } from '../utils/utils';

const data: Ref<User[]> = ref([])

const onInput = debounce(function (this: any, str: string) {
  getData({
    name: str,
  })
})

const getData = async (query: Partial<User & { orgId: string }>) => {
  if (query == null) return
  if (!query.orgId && !query.name) return

  const res = await userApi.query(query)
  data.value =res
}

defineExpose({ getData })
</script>

<style lang="scss" scoped>

</style>
