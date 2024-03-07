<script setup lang="ts">
	import { ref, onMounted, getCurrentInstance } from "vue";
import UserTable from './components/UserTable.vue'
import OrgTree from './components/OrgTree.vue'


let refs = null;
onMounted(() => {
  let { $refs } = (getCurrentInstance() as any).proxy; 
  // 你可以打印一下(getCurrentInstance() as any)会在 proxy 中发现 $refs
  refs = $refs;
});
// const usersDom = ref<typeof UserTable>();
const onChange = (data) => {
  refs.usersDom.changeSearch(data);
};
</script>
<template>
  <div class="flex container">
	  <OrgTree @onChange="onChange" />
	  <UserTable ref="usersDom" />
  </div>
</template>

<style scoped>
.container {
	width: 100vw;
	min-height: 100vh;
}
</style>
