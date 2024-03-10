<template>
  <div class="flex align-items-center pl20">
    <SearchInput v-model="inpVal" @input="onInput" class="search-input"></SearchInput>

    <Select :optList="optList" placeholder="登录状态" @select="handleSelect" class="select pl20"></Select>

    <div v-if="count" class="c999 ml30">{{ count }}个成员</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, toRefs } from 'vue';
import SearchInput from '@/components/common/search-input.vue';
import Select from '@/components/common/select.vue';

const props = defineProps({
  count: {
    type: Number,
    default: 0
  }
})

const inpVal = defineModel()
const emit = defineEmits(['input', 'select'])
function onInput() {
  emit('input', inpVal.value)
}

export interface Opt {
  label: string;
  value: number;
}
const state = reactive({
  optList: [{
    label: '登录中',
    value: 1
  },{
    label: '未登录',
    value: 2
  }] as Opt[]
})

const { optList } = toRefs(state)

function handleSelect(val: Opt) {
  emit('select', val)
}
</script>

<style lang="scss" scoped>
.search-input {
  width: 200px;
  border-right: 1px solid #eee;
}
</style>