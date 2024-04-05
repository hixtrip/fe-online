<template>
  <div class="search">
    <label>
      帅选关键字:(只能通过成员名搜索)
      <input
        type="text"
        :value="keyWord"
        placeholder="请输入关键字"
        @input="search"
      />
    </label>
  </div>
</template>

<script setup>
import { ref } from "vue";
import debounce from "../utils/debounce.js";

// 抛出事件
const emit = defineEmits(["search"]);
let keyWord = ref(""); // 搜索的关键字

const handleSearch = (e) => {
  keyWord.value = e.target.value;
  emit("search", keyWord.value);
};

const search = debounce(handleSearch, 500);
</script>
