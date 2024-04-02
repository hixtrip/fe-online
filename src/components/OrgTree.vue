<script setup lang="ts">
import type { Org } from "@/api/org"
interface Props {
  orgParent: Org[],
  orgSub: Org[],
  parentId?: string,
  orgId?: string
}

const props = withDefaults(defineProps<Props>(), {
  orgParent: () => [],
  orgSub: () => []
});
const emits = defineEmits<{
  (e: "parentChange", v: string): void;
  (e: "update:orgId", v: string): void;
}>();
const parentHandler = (id: string) => id !== props.parentId && emits("parentChange", id);
const subHandler = (id: string) => emits("update:orgId", id);
</script>

<template>
  <div class="org-tree">
    <nav>
      <ul>
        <li v-for="(item) in orgParent" :key="item.id">
          <div class="label" :class="{ active: item.id === parentId }" @click="parentHandler(item.id)">{{ item.name }}</div>
          <template v-if="parentId === item.id && orgSub.length">
            <nav>
              <ul>
                <li v-for="(subItem) in orgSub" :key="subItem.id" :class="{ active: subItem.id === orgId }" class="label" @click="subHandler(subItem.id)">
                  {{ subItem.name }}
                </li>
              </ul>
            </nav>
          </template>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.org-tree {
  width: 180px;
  margin-right: 20px;
  border: 1px solid #fff;
}
.label {
  cursor: pointer;
  transition: color .3s;
}
.label:hover {
  color: cornflowerblue;
}
.active {
  color: cornflowerblue;
}
</style>
