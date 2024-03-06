<!--
 * @Author: KokoTa
 * @Date: 2024-03-06 17:31:46
 * @LastEditTime: 2024-03-06 19:48:44
 * @LastEditors: KokoTa
 * @Description: 
 * @FilePath: \fe-online\src\index.vue
-->

<template>
  <article class="w-full h-full flex items-center justify-center flex-row">
    <section class="flex min-w-[600px] max-h-[800px] overflow-auto">
      <OrgTree @change="onChange" />
      <UserTable ref="UserTableRef" />
    </section>
  </article>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import OrgTree from './components/OrgTree.vue'
import UserTable from './components/UserTable.vue'

const UserTableRef: Ref<InstanceType<typeof UserTable> | null> = ref(null)

const onChange = (nodeInfo: { orgId: string }) => {
  UserTableRef.value?.getData(nodeInfo)
}

</script>

<style lang="scss" scoped></style>
