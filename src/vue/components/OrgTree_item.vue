<template>
    <ul class="">
          <li class="org-item" v-for="(item,index) in curOrgTree">
              <div class="org-item-title" :style="titleStyle" :class="{active:orgCheckId==item.id}"  @click="titTap(item,level)">
                 <span class="arrow" v-if="item.children && item.children.length>=1" :class="{active:item.open}"></span>
                 <span v-else class="arrow-placeholder"></span>
                 <span class="label">{{item.name}}</span>
              </div>
              <template v-if="item.children && item.children.length>=1">
                <div class="org-item-children" v-show="item.open">
                  <orgTreeItem :org-tree="item.children" :level="level+1" :org-check-id="orgCheckId"/>
                </div>  
              </template>
          </li>
       </ul>
</template>
<script>
  import orgApi from '../../api/org'
  export default{
    name:"orgTreeItem",
    props:{
      orgTree:{
        type:Array
      },
      orgCheckId:{
        type:String,
      },
      level:{
        type:Number,
        default:1
      }
    },
    computed:{
      titleStyle(){
        return {
          "padding-left":10*this.level+"px",
          "padding-right":10*this.level+"px"
        }
      }
    },
    data(){
      return {
        curOrgTree:this.initCollapseFlag(),
        toaseDiv:null,
        toastTimer:null,
      }
    },
    inject:["orgTreeParent"],
    methods:{
      // 添加是否合并标识,有children，就添加上 open:false,
      initCollapseFlag(){
        var that=this;
        function addFlag(copyTree){
          copyTree.forEach((item,index)=>{
            if(item.children && item.children.length>=1){
              if(item.open===undefined) that.$set(item,"open",false);
              addFlag(item.children)
            }
          })
        }
        addFlag(this.orgTree)
        return this.orgTree;
      },
      titTap(item,level){
        if(item.id!=this.orgCheckId){
          this.orgTreeParent.change(item);
        }

        if(item.children){  
          item.open=!item.open
          return;
        }
        if(level==4){
          if(!this.toaseDiv){ 
            this.toaseDiv=this.createToast("第四级就不要添加子数据了~");
          }
          clearTimeout(this.toastTimer);
          this.toastTimer=setTimeout(()=>{ 
            this.toaseDiv.parentNode.removeChild(this.toaseDiv);
            this.toaseDiv=null; 
          },1500) 
          return;
        }
        // 没有children的请求接口加载 
        orgApi.query().then((res)=>{
          this.$set(item,"open",true)
          this.$set(item,"children",res)
        })
      },
      createToast(text){
        var div=document.createElement("div");
        div.className="toast toast-fade";
        div.innerHTML=text;
        document.body.appendChild(div);
        return div;
      },
    },
    mounted(){
      
    },
  }
</script>
<style lang="scss">
   .toast{
    position:fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background:rgba(0,0,0,0.3);
    color:#fff;
    width:100px;
    height:100px;
    border-radius:5px;
    padding:10px;
    font-size:14px;
    display:flex;
    align-items:center;
    &.ani{
      animation:fade linear 0.3s;
    }
  }
  @keyframes fade{
    0%{
      opacity:0
    }
    100%{
      opacity:1
    }
  }
</style>
<style scoped lang="scss">
  *{list-style: none;margin:0px;padding:0px;}
  .arrow-placeholder{
    display:inline-block;
    width:8px;
    height:8px;
  }
  .arrow{
    display:inline-block;
    width:8px;
    height:8px;
    border-right:1px solid #666;
    border-bottom:1px solid #666;
    transform:rotate(-45deg);
    transition:all 0.3s;
    cursor:pointer;
    &.active{
      transform:rotate(45deg);
      position:relative;
      top:-3px;
    }
  }
  .org-item{
    padding:0px;

    .org-item-title{
      padding:10px 0px;
      cursor:pointer;
      .label{
        display:inline-block;
        margin-left:10px;
      }
      &:hover,&.active{ 
        background:#e0e9f3;
        color:#409EFF;
      }
    }
    .org-item-children{
     
    }
  }
</style>