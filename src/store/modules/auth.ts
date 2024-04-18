import { defineStore } from 'pinia';
import { AuthState } from '../interface/index';
import piniaPersistConfig from '@/config/piniaPersist';
// 第一个参数是应用程序中 store 的唯一 id
export const AuthStore = defineStore('main', {
    // state: 返回对象的函数
    state: (): AuthState => ({}),
    getters: {},
    actions: {},
    persist: piniaPersistConfig('planData'),
});
