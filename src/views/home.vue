<template>
  <div class="outer-box">
      <el-row>
        <el-col :span="8">
        <org-tree @change="change" />
      </el-col>
         <el-col :span="16">
          <user-table :id="orgId" />
        </el-col>
      </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import OrgTree from '../components/orgTree/index.vue'
import UserTable from '../components/userTable/index.vue'
const orgId = ref('')
const change = (id: string) => {
  orgId.value = id
}


</script>
<style lang="scss" scoped>

</style>