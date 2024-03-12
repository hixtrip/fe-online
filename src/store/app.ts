import { defineStore } from 'pinia';

export const appStore = defineStore('app', {
  state: () => {
    return {
      treeItem: {
        name: '总部',
        id: '0',
        children: [],
        tags: ['总部']
      }
    };
  },
  actions: {
  }
});
