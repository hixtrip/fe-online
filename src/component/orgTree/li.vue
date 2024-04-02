<template>
    <div class="uuli" ref="lli">
        {{ liData.name }}
        <div v-if="liData.children" @click="getLiData">有值</div>
        <div v-if="liShowFlag" class="baseli">
            <Ul v-if="liData.children" :ulData="liData.children"></Ul>
        </div>
    </div>
</template>
<script setup>
import { onMounted,ref } from 'vue';
import Ul from './ul.vue'

const props = defineProps({
    liData:Object
});
const lli = ref();
const liShowFlag = ref(false);
const num = ref(0)
const liData = ref(props.liData);
const getLiData = (item) =>{
    num.value++;
    liShowFlag.value = !liShowFlag.value;
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