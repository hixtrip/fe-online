<template>
  <div class="header-wrap flex align-items-center pl20">
    <div v-for="nav in navList" :class="['nav-item', route.name === nav.name && 'active']" @click="handleClick(nav)">{{ nav.title }}</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const state = reactive({
  navList: [{
    name: 'MemberManage',
    title: '成员管理'
  },{
    name: 'TeamManage',
    title: '团队管理'
  },{
    name: 'JobManage',
    title: '职位维护'
  }]
})

const { navList } = toRefs(state)

function handleClick(nav) {
  router.push({ name: nav.name })
}
</script>

<style lang="scss" scoped>
.header-wrap {
  border-bottom: 1px solid #eeeeee;
  color: #4d4d4d;
  .nav-item {
    height: 40px;
    line-height: 40px;
    margin-right: 30px;
    cursor: pointer;
    position: relative;

    &.active {
      color: #409EFF;
      &::before {
        content: '';
        display: block;
        position: absolute;
        bottom: -1px;
        width: 100%;
        height: 2px;
        background: #409EFF;
      }
    }
  }
}
</style>