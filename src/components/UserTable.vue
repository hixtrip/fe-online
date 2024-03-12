<template>
    <div class="user_table_box">
        <div class="top_tag">
            {{ Object.keys(appStoreData.treeItem).length ? appStoreData.treeItem.tags.join(' / ') : '' }}
        </div>
        <div class="search_box">
            <input type="text" class="search_input" placeholder="搜索id" @input="changeInput">
            <span class="line"></span>
            <input type="text" class="search_input" placeholder="搜索姓名" @input="(e) => changeInput(e, 'name')">
            <span class="line"></span>
            <input type="text" class="search_input" placeholder="复合搜索框" @input="(e) => changeInput(e, 'id', 'name')">
        </div>
        <div class="box">
            <table class="table_box" border :cellspacing="0" bordercolor="#ccc">
                <thead>
                    <td>id</td>
                    <td>姓名</td>
                </thead>
                <tr v-for="item in (searchList.length ? searchList : list)" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { appStore } from '../store/app'
import { debounce } from '../utils/app'

const appStoreData = appStore()
const searchList = ref([])

const props = defineProps({
    list: {
        type: Array,
        default: []
    }
})

const emit = defineEmits('changeInput')

const changeInput = debounce((e, key = 'id', key2) => {
    searchList.value = props.list.filter(item => item[key].indexOf(e.target.value) !== -1 || item[key2].indexOf(e.target.value) !== -1)
})

</script>

<style scoped>
.user_table_box {
    width: 100%;
    display: flex;
    flex-direction: column;
}
.top_tag {
    width: 100%;
    padding: 6px 16px;
    font-size: 15px;
    border-bottom: 1px solid #ccc;
    height: 65px;
    line-height: 58px;
    box-sizing: border-box;
    font-size: 13px;
    color: #333;
}
.search_box {
    display: flex;
    align-items: center;
    padding: 16px 16px 8px;
}
.search_input {
    border: none;
    padding: 4px 8px 8px;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 14px;
    color: #616161;
    transition: all 0.5s;
    margin-right: 16px;
}
.search_input:focus {
    border-color: rgba(105, 167, 244);
}
.line {
    width: 1px;
    height: 80%;
    background: #ccc;
    margin-right: 16px;
}
.box {
    overflow: auto;
    flex: 1;
    height: 50%;
}
.table_box {
    min-width: 90%;
    margin: 16px;
}
.table_box td {
    padding: 8px 10px;
    font-size: 14px;
    color: #616161;
}
.table_box tr:hover {
    transition: all 0.5s;
    background: rgba(105, 167, 244, 0.2);
}
</style>
