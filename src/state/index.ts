import { reactive } from 'vue'

export const state = reactive({
  orgId: '',
  setOrgId(id: string) {
    this.orgId = id
  },

  // 选中的菜单
  selectedMenu: {
    parentName: '',
    childName: '',
  },
  setSelectedMenu(parentName: string, childName: string) {
    this.selectedMenu = {
      parentName,
      childName,
    }
  },
})
