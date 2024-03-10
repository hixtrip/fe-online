<template>
  <div class="org-tree-wrapper">
    <ul class="org-tree">
      <org-tree-item
        :activeItem="activeId"
        @activeChange="handleActive"
        v-for="item in orgList"
        :key="item.id"
        :item="item"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import OrgTreeItem from "./OrgTreeItem.vue"
import orgApi from "../api/org"
import { ref } from "vue"
type resultItem = {
  id: string
  name: string
  children?: resultItem[]
}

const activeId = ref("0")

const orgList = ref([] as resultItem[])

const getTree = async (id = "0") => {
  const res = await orgApi.query(id)
  orgList.value = res
}

getTree()

const emits = defineEmits<{
  (e: "changeActiveItem", value: string): void
}>()

const handleActive = async (item: resultItem) => {
  activeId.value = item.id
  emits("changeActiveItem", item.id)
  if (!item.children) {
    const res = await orgApi.query(item.id)
    item.children = res
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
.org-tree-wrapper {
  background-color: #f0f2f5;
  padding: 20px;
  width: 300px;
  height: 800px;
  overflow-y: scroll;
}

.org-tree {
}

.org-tree__item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.org-tree__item-active {
  border-color: blue;
  box-shadow: 0 0 5px #ccc;
}

.org-tree__item__children {
  margin-left: 20px;
}

.org-tree__item__child {
  margin-bottom: 5px;
}
</style>
