<template>
	<span @click="changeExpand">{{ expand ? '-' : '+' }}</span>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const expand = ref(false)
const emit = defineEmits(['change'])
const changeExpand = () => {
  expand.value = !expand.value;
  emit('change',expand.value)
}
</script>



<style lang="css" scoped></style>
