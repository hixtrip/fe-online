<template>
  <div class="org_tree">
    <el-tree
      :load="loadNode"
      lazy
      :data="state.orgData"
      :props="defaultProps"
      style="max-height: 600px; overflow: auto"
    ></el-tree>
  </div>
</template>

<script setup lang="ts" name="OrgTree">
import orgApi from "../api/org";
import { reactive, defineEmits } from "vue";
interface Tree {
  name: string;
}
interface Org {
  id: String;
  name: String;
  children?: Array<Org>;
}
const emit = defineEmits(["emit"]);
const defaultProps = {
  children: "children",
  label: "name",
};
const state = reactive({
  orgData: [] as Org[],
});
const initData = async () => {
  orgApi.query("1").then((res) => {
    state.orgData = res;
  });
};
initData();

const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  orgApi.query(node?.data.id).then((res) => {
    resolve(res);
    emit("change");
  });
};
</script>

<style scoped>
.org_tree {
  width: 100%;
  height: 100%;
}
</style>
