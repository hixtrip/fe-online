<template>
  <div class="user-table" v-if="load">
      <div class="breadcrumb">{{breadCrumb}}</div>
      <form class="table-form"> 
          <div class="form-item"> 
            <input v-model="inputContent" @input="debounceSearch" class="form-input" type="text" placeholder="请输入搜索内容">
            <span class="clear" @click="clearTap">x</span> 
          </div>
      </form>
      <div class="table-wrap">
          <table>
              <tr>
                <td>姓名id</td>
                <td>用户名name</td>  
              </tr>
              <template v-for="(item,index) in tableData">
                <tr :key="item.id">
                  <td>{{item.id}}</td>
                  <td>{{item.name}}</td>
                </tr>
              </template>
              
          </table>
      </div>  
  </div>
</template>
<script>
 import userApi from '../../api/user'
  export default{
    created(){
      this.debounceSearch=this.debounce(this.search);
    },
    data(){
      return {
        inputContent:"",
        tableData:[],
        load:false,
        condition:{},
        breadCrumb:"",
      }
    },
    methods:{
      searchChange(item,orgTree){ 
        this.load=true;
        this.inputContent="";
        this.condition=JSON.parse(JSON.stringify(item))
        this.breadCrumb=this.getBreadCrumb(item,orgTree,"",true);
        this.search();
      },
      getBreadCrumb(item,orgTree,breadCrumb,firstLevel){ 
        for(var i=0;i<orgTree.length;i++){
          var curItem=orgTree[i];
          var targetId=item.id;
          var curId=curItem.id,
              curName=curItem.name;  
          if(firstLevel){
            breadCrumb="";
          }
          if(curId==targetId){ 
            breadCrumb+=((breadCrumb==""?"":"/")+curName);
            return breadCrumb;
          }
          if(curItem.children && curItem.children.length>=1){ 
            var childRes=this.getBreadCrumb(item,curItem.children,breadCrumb+((breadCrumb==""?"":"/")+curName),false);
            if(childRes){
              return childRes;
            }
          }
        }
      },
      clearTap(){
       if(this.inputContent==""){ return; }
        this.inputContent="";
        this.search();
      },
      search(){
        var params={ 
          inputKey:this.inputContent, //input输入的内容
          condition:this.condition
        }
        userApi.query(params).then((res)=>{  
          console.log(res)
          this.tableData=res;
        })
      },
      debounce(fn){
        var timer=null;
        return function(){
          clearTimeout(timer);
          timer=setTimeout(()=>{
            fn.apply(this,arguments)
          },500)
        }
      },
    }
  }
</script>
<style scoped lang="scss">
.user-table{
  flex:1;
  overflow:auto;
  .breadcrumb{
    padding: 0 15px;
    height: 50px;
    border-bottom: 2px solid #f2f2f2;
    line-height: 50px;
  }
  .table-form{
    height:50px;
    line-height:50px;
    padding:0px 15px;
    .form-item{display:inline-block;position:relative;}
    .form-input{ 
      height:25px;
      padding:0px 5px;
      outline:none; 
    }
    .clear{
        position:absolute;
        width:25px;
        text-align:center;
        height:25px;
        line-height:25px;
        right:0px;
        top:14px;
        cursor:pointer;
        &:hover{
          color:blue;
        }
      }
  }
  .table-wrap{
    padding:0px 15px;
    margin-top:10px;
    margin-bottom:30px;
    table{
      width:100%;
      table-layout:fixed;
      border:1px solid #ddd;
      border-collapse: collapse;
    }
    td,th{
      border:1px solid #ddd;
      border-collapse: collapse;
      text-align:center;
      height:30px;
    }
  }
}
</style>