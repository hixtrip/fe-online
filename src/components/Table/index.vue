<template>
  <table>
    <thead>
        <tr>
            <th v-for="(thead) in columns">{{thead.title}}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(tr_item,i) in dataSource" :key="tr_item.id || i">
            <td v-for="(thead) in columns">{{ tr_item[thead.key] }}</td>
        </tr>

        <h2 v-if="dataSource.length==0">暂无数据</h2>
    </tbody>
  </table>
</template>

<script lang="ts" setup >
defineProps<{columns:any[],dataSource:any[]}>()

</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
}
th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
th {
    background-color: #f2f2f2;
    font-weight: bold;
}
tr:hover {
    background-color: #f5f5f5;
}
</style>