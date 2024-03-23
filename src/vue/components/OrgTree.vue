<template>
  <div class="org">
    <div class="org-header">
      <div class="left">{{title}}</div>
      <div class="right">
          <slot name="action">
            <span class="add">+</span>
          </slot>
      </div>
    </div>
    <div class="org-main"> 
       <OrgTreeItem :org-tree="orgTree" :org-check-id="value" /> 
    </div>
  </div>
</template>
<script>
  import OrgTreeItem from "./OrgTree_item.vue"
  export default{
    name:"orgTree",
    props:{
      title:{
        type:String
      },
      value:String,
    },
    provide(){
      return {
        orgTreeParent:this
      }
    },
    data(){
      return {
        orgTree:[
					{
						name:"厦门旅游1",
						id:"1",
						children:[
							{
								name:"技术部1-1",
								id:"1-1",
								children:[
									{
										name:"开发1-1-1",
										id:"1-1-1",
									},{
										name:"测试1-1-2",
										id:"1-1-2"
									}
								]
							},
							{
								name:"未分配部门1-2",
								id:"1-2",
							}
						]
					},{
						name:"厦门旅游11",
						id:"2",
					}
				],
      }
    },
    methods:{
      change(item){
        this.$emit("input",item.id);
        this.$emit("change",item,this.orgTree)
      },
      orgIdInTree(id,orgTree){
        var copyOrgTree=JSON.parse(JSON.stringify(orgTree));
        for(var i=0;i<copyOrgTree.length;i++){
          var curTree=copyOrgTree[i];
          if(curTree.id==id){
            return curTree;
          }
          if(curTree.children && curTree.children.length>=1){
            var childRes=this.orgIdInTree(id,curTree.children);
            if(childRes){
              return childRes;
            }
          }
        }
        return false;
      },
    },
    mounted(){
      if(this.orgTree && this.orgTree.length>=1){
        var curItem;
        if(this.value && (curItem=this.orgIdInTree(this.value,this.orgTree))){}else{
          curItem=this.orgTree[0];
          this.orgCheckId=curItem.id;
        }
        this.change(curItem);
      }else{
        this.$emit("input","");
      }
    },
    components:{
      OrgTreeItem
    }
  }
</script>
<style lang="scss">
  .org{
    width:300px;
    height:100%;
    display:flex;
    border-right:2px solid #f2f2f2;
    flex-direction:column;
    .org-header{
      height:50px;
      line-height:50px;
      display:flex;
      border-bottom:2px solid #f2f2f2;
      padding-left:10px;
      .left{ flex:1 }
      .right{ 
        margin-left:20px; 
        .add{
          cursor:pointer;
          display:inline-block;
          font-size:30px;
          color:#666;
          width:40px;
          text-align:center;
        }
      }
    }
    .org-main{
      flex:1;
      padding:10px 0px;
      overflow:auto;
    }
  }
</style>