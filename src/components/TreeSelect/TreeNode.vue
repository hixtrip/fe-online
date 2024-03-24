<template>
	
</template>

<script lang="ts" setup>
import { type treeItem } from './typing'
import TreeSelect from './index.vue'
import { ref } from "vue";
const props = defineProps<{ treeOptionData: treeItem }>()
const emit = defineEmits(['getChildren'])
const expand = ref(false)
const changeExpand = () => {
	expand.value = !expand.value
	emit('getChildren',props.treeOptionData.id)
}
</script>



<style lang="css" scoped></style>
