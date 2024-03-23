<template>
  <div class="tabs">
      <div class="tab" v-for="(item,index) in tabs" 
        :class="{active:value==index}"
        @click="tabChange(index)"
      >{{item}}</div>
  </div>
</template>
<script>
  export default{
    props:{
      tabs:Array,
      value:{
        type:Number,
        default:0
      }
    },
    methods:{
      tabChange(index){
        this.$emit("input",index)
      }
    }
  }
</script>
<style scoped lang="scss">
.tabs{
  height:50px;
  line-height:50px;
  font-size:16px;
  display:flex;
  border-bottom:2px solid #f2f2f2;
  .tab{
    padding:0px 5px;
    margin:0px 10px;
    cursor:pointer;
    &.active{
      color:#409EFF;
      position:relative;
      &:after{
        content:"";
        position:absolute;
        left:0px;
        right:0px;
        top:100%;
        height:2px;
        background:#409EFF;
      }
    }
  }
}
</style>