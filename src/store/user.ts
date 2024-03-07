import { defineStore } from "pinia";
import {ref } from 'vue'
import userApi from '../../src/api/user';
export const useUserStore = defineStore('user', () => {
    const userList = ref<any[]>([]);
    async function getUser() {
        userApi.query({}).then((users) => {
            userList.value = users
            console.log(userList.value)
        })
    }
    return { getUser, userList}
})