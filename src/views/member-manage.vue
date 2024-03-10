<template>
  <Layout>
    <div class="flex h100p overflow-hidden">
      <div class="sider-wrap">
        <div class="sider-header flex align-items-center justify-content-space-between">
          部门
          <svg-icon name="add" width="12" height="12" class="cursor-pointer"></svg-icon>
        </div>

        <!-- 部门树 -->
        <OrgTree class="org-tree flex-1" :func="getOrgList" @select-node="selectOrgFn"></OrgTree>
      </div>
      <div class="main flex-1">
        <OrgBreadcrumb class="org-breadcrumb" :list="parentList"></OrgBreadcrumb>

        <div class="pl20 pr20">
          <TableFilter class="table-filter" :count="count" @input="onInput" @select="handleSelect"></TableFilter>

          <!-- 用户列表 -->
          <UserTable
            :keyword="toRaw(searchVal)"
            :selectOrg="toRaw(selectOrg)"
            :status="toRaw(status)"
            @list-count="(c) => count = c"
          ></UserTable>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { reactive, toRefs, watch, toRaw } from 'vue';
import OrgTree from '@/components/common/org-tree/org-tree-wrap.vue';
import orgApi from '@/api/org';
import type { Org } from '@/api/org';
import OrgBreadcrumb from '@/components/member-manage/org-breadcrumb.vue';
import TableFilter from '@/components/member-manage/table-filter.vue';
import type { Opt } from '@/components/member-manage/table-filter.vue';
import UserTable from '@/components/member-manage/user-table.vue';
import { debounce } from '@/utils/tools'

const state = reactive({
  selectOrg: null as Nullable<Org>,
  parentList: [] as Org[],
  searchVal: '',
  count: 1,
  status: null as Nullable<Opt>
})
const { selectOrg, parentList, searchVal, count, status } = toRefs(state)
function selectOrgFn(org: Org, parentList: Org[]) {
  state.selectOrg = org
  state.parentList = parentList
}

async function getOrgList(parentId: string, level: number) {
  try {
    // 这里假设最大只有4级
    if (level > 3) return

    const data = await orgApi.query(parentId)
    return data
  } catch (e) {
    console.error(e)
  }
}

function handleSelect(val: Opt) {
  state.status = val
}

const onInput = debounce((val) => {
  state.searchVal = val
}, 500)
</script>

<style lang="scss" scoped>
.sider-wrap {
  width: 200px;
  border-right: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;

  .sider-header {
    height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #eeeeee;
  }
  .org-tree {
    overflow-y: auto;
  }
}
.org-breadcrumb {
  border-bottom: 1px solid #eeeeee;
}

.table-filter {
  height: 40px;
  border-bottom: 1px solid #eeeeee;
}
</style>