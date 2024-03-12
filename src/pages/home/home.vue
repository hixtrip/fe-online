<template>
    <div class="container flex-col">
        <Tabs
         :options="tabList" @handleTabKey="handleTabKey" :actionKey="actionKey" 
        />
        <!-- 成员管理 start -->
        <div
            v-if="actionKey === 1"
            class="flex-1 overflow-auto"
        >
            <div class='flex-row content_box'>
                <OrgTree :list="orgList" @handleAdd="handleAdd" />
                <UserTable :list="userList" @changeInput="changeInput" />
            </div>
        </div>
        <!-- 成员管理 end -->
        <!-- 团队管理 start -->
        <div
            v-if="actionKey === 2"
            class="warp"
        >
            团队管理
        </div>
        <!-- 团队管理 end -->
        <!-- 职位维护 start -->
        <div
            v-if="actionKey === 3"
            class="warp"
        >
            职位维护
        </div>
        <!-- 职位维护 end -->
    </div>
    
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { appStore } from '../../store/app';
const appStoreData = appStore();
import Tabs from '../../components/Tabs.vue';
import OrgTree from '../../components/OrgTree.vue';
import UserTable from '../../components/UserTable.vue';
import orgApi from '../../api/org';
import userApi from '../../api/user';
const tabList = ref([{
    key: 1,
    value: '成员管理'
}, {
    key: 2,
    value: '团队管理'
}, {
    key: 3,
    value: '职位维护'
}])
const actionKey = ref(1);
const selectTreeItem = ref({});
const orgList = ref([]);
const userList = ref([]);
const tagList = ref([])
onMounted(()=>{
    getOrgList();
    getUserList('0');
});

const getOrgList = () => {
    orgApi.query().then(res => {
        const newList = [
            {
                name: '总部',
                id: '0',
                children: [],
                tags: ['总部']
            }
        ]
        newList[0].children = res.map(item => ({...item, tags: ['总部', item.name]}));
        orgList.value = newList;
    })
}

watch(() => appStoreData.treeItem, (newValue) => {
    getTreeItem(orgList.value, newValue);
    if(selectTreeItem.value.id === newValue.id) return
    getUserList(newValue.id)
    selectTreeItem.value = newValue;
})
const getUserList = (id) => {
    userApi.query(id).then(res => {
        userList.value = res;
    })
    console.log(userList.value, 'uesrlist');
}
const handleTabKey = (key) => {
    actionKey.value = key;
}

const getTreeItem = (list, item) => { 
    list.forEach(async el => {
        if(el.id === item.id) {
            const res = await orgApi.query({id: el.id});
            el.children = selectTreeItem.value.id === el.id && el.children?.length ? undefined : res.map(citem => ({...citem, tags: [...item.tags, citem.name]}));
        } else if (el?.children?.length) {
            getTreeItem(el.children, item);
        }
    });
}

const handleAdd = () => {
    orgList.value.push({
        id: Math.random() + '',
        name: (Math.random() + 1).toString(36).substring(7),
    })
}

const changeInput = (e) => {
    userList.value = userList.value.filter(item => item.id.indexOf(e) !== -1)
}

</script>

<style scoped>
.container {
    height: 100vh;
}
.warp {
    padding: 16px;
}
.content_box {
    height: 100%;
}
.flex-row {
    display: flex;
}
.flex-col {
    display: flex;
    flex-direction: column;
}
.overflow-auto {
    overflow: auto;
}
.flex-1 {
    flex: 1;
}
</style>