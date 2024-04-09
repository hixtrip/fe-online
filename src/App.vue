<template>
    OrgApi
    <div v-for="(org, index) in orgnizations" :key="index">{{ org }}</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import orgApi from './api/org'
import type { Org, User } from './api/types'
import userApi from './api/user'
const orgnizations = reactive<Org[]>([])
orgApi.query().then((res) => res.forEach((org) => orgnizations.push(org)))

const users = reactive<User[]>([])
userApi.query().then((res) => res.forEach((user) => users.push(user)))
</script>
