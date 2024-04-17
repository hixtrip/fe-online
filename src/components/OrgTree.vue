<script setup lang="ts">
import { ref } from 'vue'
import orgApi from '@/api/org'
import { Org } from '@/types/org'
import { state } from '@/state'

type OrgList = Org & { children?: Org[] }
const orgList = ref<OrgList[]>([])
const selectedParent = ref<Org>({ id: '0', name: '' })

async function fetchData() {
  const { id: pid, name: pname } = selectedParent.value
  const data = await orgApi.query()
  // 一级
  if (pid === '0') {
    orgList.value = data
    return
  }
  // 二级
  console.log('org params: ', pid)
  orgList.value = orgList.value.map((item) => {
    if (item.id === pid) {
      item.children = data
    }
    return item
  })

  if (!data.length) return
  const { id: cid, name: cname } = data[0] // 默认选中第一个
  state.setOrgId(cid)
  state.setSelectedMenu(pname, cname)
}

fetchData()

// 点击父节点
function clickParent(obj: Org) {
  const pid = selectedParent.value.id
  if (pid === obj.id) return // 父节点未发生变化，不再请求数据

  selectedParent.value = obj
  const curParent = orgList.value.find((item) => item.id === obj.id)
  if (curParent?.children) {
    // 已加载过
    if (curParent.children.length) {
      // 有数据
      clickChild(curParent.children[0])
    }
    return
  }

  fetchData()
}
// 点击子节点
function clickChild(obj: Org) {
  state.setOrgId(obj.id)
  state.setSelectedMenu(selectedParent.value.name, obj.name)
}
</script>

<template>
  <nav class="nav-container">
    <ul class="tree-menu">
      <li
        v-for="parent in orgList"
        :key="parent.id"
        @click="clickParent(parent)"
        class="menu-item"
      >
        <span>{{ parent.name }}</span>
        <ul :class="['sub-menu', { active: parent.id === selectedParent.id }]">
          <li
            v-for="child in parent.children"
            :key="child.id"
            @click.stop="clickChild(child)"
            class="menu-item"
          >
            <span :class="{ active: child.id === state.orgId }"
              >{{ child.name }}({{ child.id }})</span
            >
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-container {
  width: 300px;
  height: 100vh;
  padding: 20px;
  border-right: 1px solid #ddd;
}
.tree-menu,
.sub-menu {
  margin: 0;
  padding-left: 15px;
}
.sub-menu {
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  display: none;
}
.sub-menu.active {
  display: block;
  height: auto;
}
.menu-item {
  cursor: pointer;
}
.menu-item span:hover,
.menu-item span.active {
  color: #06f;
}
</style>
