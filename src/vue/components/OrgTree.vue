<!--
 * @Author: chenhuang
 * @Date: 2024-03-21 10:05:20
 * @Description: 树型组件
-->
<template>
  <a-tree
    v-model:expandedKeys="expandedKeys"
    :tree-data="treeData"
    :load-data="onLoadData"
    @select="treeSelect"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { menu } from "ant-design-vue";
import Org from "~/api/org.ts";
import _ from "lodash";

// 定义组件内部需要传递给外部的所有事件。
const emit = defineEmits(["select"]);

/**
 * 组件内 Utils 方法。
**/
const { query } = Org;
// 设置全局的节流标志（每个接口可以在axios设置自动生成）
const excFlag = ref(false)
// 编写节流函数
const throttle = (fn, wait)=>{
  if(excFlag.value) return;
  excFlag.value = true;
  fn();
  const excTimer = setTimeout(()=>{
    excFlag.value = false;
    clearTimeout(excTimer)
  }, wait)
}

/**
 * ant-design 组件相关；
**/
const treeData = ref<TreeProps["treeData"]>([
  { title: "嗨行旅游", key: "0" },
  { title: "未分配部门", key: "1" },
]);
const expandedKeys = ref<string[]>(["01", "02"]);

interface Org {
  id: string;
  name: string;
}
// 树节点展开事件；
const onLoadData: TreeProps["loadData"] = (treeNode: {
  dataRef: { children: { title: string; key: string; value: string }[] };
}) => {
  return new Promise<void>((resolve) => {
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }

    // 查询组织结构函数
    const queryFun = ()=>{
      query().then((res: Org[]) => {
        treeNode.dataRef.children = res.map((v: Org) => {
          return {
            title: v.name,
            key: v.id,
            value: v.id,
          };
        });
        treeData.value = [...treeData.value];
        resolve();
      });
    }

    // 执行节流函数。
    throttle(queryFun, 1500)
  });
};
// 树节点点击事件。
const treeSelect = (
  selectedKeys: any[],
  e: { node: {} | undefined },
  _event: any
) => {
  const curNode = selectedKeys[0];
  /**
   * 节点返回的数据结构
    const map1 = {
      parent: {
        node: {
          title: "11",
        },
        parent: {
          node: {
            title: "111",
          },
          parent: null,
        },
      },
    };
  */

  // 递归获取路径上所有树节点名称。
  const fun1 = (Obj = {}, result = []) => {
    // 取得标题
    if (_.has(Obj, "node")) {
      result.push(Obj.node.title);
    }
    if (_.has(Obj, "parent") && _.get(Obj, "parent")) {
      fun1(_.get(Obj, "parent"), result);
    }
    return result;
  };
  // 获取到树节点各个层级节点名称。
  const titleResult = [e.node.title].concat(fun1(e.node)).reverse();

  // 触发事件，将选择结果传递给外部。
  emit("select", titleResult);
};

</script>
