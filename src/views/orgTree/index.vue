<template>
  <div id="org" class="orgTree">
    <h1 class="org-title">
      <span>部门</span>
      <el-icon><Plus /></el-icon>
    </h1>
    <el-tree
      ref="treeRef"
      :data="orgTree"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      @node-click="nodeClick"
    />
  </div>
</template>

<script setup>
import orgApi from "../../api/org";
import { ref, reactive, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";
const orgTree = ref([]);
const defaultProps = {
  children: "children",
  label: "name",
};
const handleGetData = (parentId = "1") => {
  orgApi.query(parentId).then((data) => {
    orgTree.value = data;
  });
};
onMounted(() => {
  handleGetData();
});
const emit = defineEmits(["getOrgName"]);

const nodeClick = (e) => {
  emit("getOrgName", e);
};
</script>

<style scoped lang="scss">
.orgTree {
  width: 500px;
  border-right: 1px solid #ebeef5;
  .org-title {
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    padding: 0 8px;
    color: #333;
    text-align: left;
    border-bottom: 1px solid #ebeef5;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
