<template>
  <div class="org-container">
    <div class="row justify-between items-center org-search">
      <span>部门</span>
      <el-icon><Plus /></el-icon>
    </div>
    <el-tree
      style="max-width: 600px"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :load="loadNode"
      :highlight-current="true"
      lazy
    />
  </div>
</template>

<script setup lang="ts">
import orgApi, { Org } from '../../api/org';
import type Node from 'element-plus/es/components/tree/src/model/node';

defineOptions({
  name: 'OrgTree',
});
const emit = defineEmits<{
  (event: 'selectOrg', id: string, path: string): void;
}>();
const defaultProps = {
  children: 'children',
  label: 'name',
};

const loadNode = (node: Node, resolve: (data: Org[]) => void) => {
  orgApi.query(node.level === 0 ? '0' : node.data.id).then((res) => {
    resolve(res);
  });
};

function throttle<F extends (...args: any[]) => any>(
  fn: F,
  interval: number
): (...args: Parameters<F>) => void {
  let lastTime: number = 0;
  let timeoutID: number | null = null;

  return (...args: Parameters<F>): void => {
    const now = Date.now();
    const remaining = interval - (now - lastTime);

    const later = () => {
      lastTime = now;
      timeoutID = null;
      fn(...args);
    };

    if (remaining <= 0 || remaining > interval) {
      if (timeoutID !== null) {
        clearTimeout(timeoutID);
        timeoutID = null;
      }
      lastTime = now;
      fn(...args);
    } else if (timeoutID === null) {
      timeoutID = window.setTimeout(later, remaining);
    }
  };
}

const handleNodeClick = throttle((data: Org, node: Node) => {
  const func = (recurNode: Node, path: string): string => {
    path = (recurNode.data.name + '/').concat(path);
    if (
      recurNode?.parent?.data &&
      Object.keys(recurNode?.parent?.data)?.length
    ) {
      return func(recurNode.parent, path);
    } else {
      return path;
    }
  };
  emit('selectOrg', data.id, func(node, ''));
}, 1000);
</script>

<style scoped lang="scss">
.org-container {
  width: 100%;
  height: 100%;
  border-right: 1px solid rgb(203, 198, 198);
  .org-search {
    padding: 10px;
    border-bottom: 1px solid rgb(203, 198, 198);
  }
}
</style>
