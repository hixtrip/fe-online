<template>
  <div class="org-breadcrumb flex align-items-center pl20">
    <svg-icon name="flow" width="14" height="14" class="block"></svg-icon>
    <span class="ml8 c999">厦门嗨行旅游<span v-if="list?.length > 0" class="ml4 mr4">/</span></span>
    <div v-for="(org, i) in list">
      {{ org.name }}<span v-if="i < list?.length - 1" class="ml4 mr4">/</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, watch } from 'vue';
import type { Org } from '@/api/org';

const props = defineProps({
  list: {
    type: Array as PropType<Org>,
    default: []
  }
})
</script>

<style lang="scss" scoped>
.org-breadcrumb {
  height: 40px;
}
</style>