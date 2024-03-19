import { defineStore } from "pinia";
export const recordTabSelect = defineStore("recordTabSelect", {
  // 将id作为第一个参数
  state: () => {
    return {
      result: "",
    };
  },
  actions: {
    set(result: string) {
      this.result = result;
    },
  },
});
