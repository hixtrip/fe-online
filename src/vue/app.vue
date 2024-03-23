<template>
	<div class="container">
			<Tabs v-model="tabsValue" :tabs="tabs" />
			<div class="main-wrap">
				<OrgTree title="部门" v-model="orgCheckId" @change="change"/>
				<UserTable ref="userTableRef" />
			</div> 
	</div>
</template>
<script type="text/javascript">
	import Tabs from "./components/Tabs.vue"
	import OrgTree from "./components/OrgTree.vue"
	import UserTable from "./components/UserTable.vue"
	export default{
		data(){
			return {
				tabs:["成员管理","团队管理","职位维护"],
				tabsValue:0,
				orgCheckId:"1",
				userCondition:{},   
			}
		},
		methods:{
			change(item,orgTree){
				this.$refs.userTableRef.searchChange(item,orgTree);
			},
		},
		components:{
			Tabs,
			OrgTree,
			UserTable
		}
	}
</script>
<style type="text/css" lang="scss">
	.container{
		width:100%;
		height:100vh;
		display:flex;
		flex-direction:column;
		.main-wrap{
			flex:1;
			display:flex;
			height:1px;
		}
	}
</style>