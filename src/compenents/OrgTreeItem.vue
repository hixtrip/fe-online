<!-- OrgTreeItem.vue -->
<template>
  <li :class="[props.activeItem === props.item.id ? 'active' : '']">
    <span @click="activeChange(item)"> {{ item.name }}</span>
    <ul v-if="props.item.children">
      <org-tree-item
        v-for="child in props.item.children"
        :key="child.id"
        :item="child"
        @activeChange="activeChange"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
type resultItem = {
  id: string
  name: string
  children?: resultItem[]
}

const props = defineProps<{
  item: resultItem
  activeItem?: string
}>()

const emits = defineEmits<{
  activeChange: [value: resultItem]
}>()

const activeChange = (item: resultItem) => {
  emits("activeChange", item)
}
</script>

<style scoped>
li {
  list-style-type: none;
  color: #333;
  background: #fff;
  cursor: pointer;
}

li::before {
  content: "— ";
}

ul {
  padding-left: 1em;
}
.active {
  background-color: #f0f2f5;
  color: blue;
}
</style>
