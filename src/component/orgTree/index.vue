<template>
    <div class="orgtree">
        <Ul :ulData="ulData"></Ul>
    </div>
</template>

<script lang="ts" setup>
import { onMounted,ref,getCurrentInstance } from 'vue'
import Ul from './ul.vue'
import {getOrg} from './index'
import {Org} from './interface'
const orgList = ref([] as Org[]);
const ulData =[{
    name:"ccc",
    id:222,
    children:[{
        name:"ddd",
        id:11,
        children:[{
            name:"qqq",
            id:222,
            children:[{
                name:"zzz",
                id:555
            }]
        }]
    }]
},
{
    name:"mmm",
    id:333,
    children:[{
        name:"nnn",
        id:11
    }]
}]
const Bus = getCurrentInstance()?.proxy?.Bus;
const emit = defineEmits(["change"])
Bus.on("treeChange",(res:number)=>{
    emit("change",res)
})
// const menuActive = ref(0);
// // 获取org
// const changeOrg = debounce(function(item:Org|{}){
//     Bus.emit("orgChange",item)
// },300)

const getList = () =>{
    getOrg()?.then((res:Org[]) =>{
        orgList.value = res;
    });
}
onMounted(async()=>{
    await getList();
})
</script>