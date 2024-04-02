<template>
    <div class="uuli" ref="lli" @click.stop="getLiData(liData.id)">
        {{ liData.name }}
        <div v-if="liShowFlag" class="baseli">
            <Ul v-if="liData.children" :ulData="liData.children"></Ul>
        </div>
    </div>
</template>
<script setup>
import { onMounted,ref,getCurrentInstance } from 'vue';
import Ul from './ul.vue'
const Bus = getCurrentInstance()?.proxy?.Bus;
const props = defineProps({
    liData:Object
});
const lli = ref();
const nowId = ref(null)
const liShowFlag = ref(false);
const liData = ref(props.liData);
// const emit = defineEmits(["change"])
const getLiData = (id) =>{
    nowId.value= id
    liShowFlag.value = !liShowFlag.value;
    Bus.emit("treeChange",nowId.value)
}
onMounted(()=>{
})
</script>

<style scoped lang="scss">
@mixin uuli{
    width: 100px;
    min-height: 40px;
}
.uuil{
    @include uuli;
}
.baseli{
    @include uuli;
    margin-left: 10px;
}
</style>