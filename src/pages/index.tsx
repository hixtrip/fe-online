import { defineComponent } from 'vue'
import { Tabs } from 'ant-design-vue'

import MemberManagement from '@/pages/MemberManagement'
import TeamManagement from '@/pages/TeamManagement'
import JobMaintenance from '@/pages/JobMaintenance'

export const tabList = [
  { value: 'memberManagement', text: '成员管理', component: MemberManagement },
  { value: 'teamManagement', text: '团队管理', component: TeamManagement },
  { value: 'jobMaintenance', text: '职位维护', component: JobMaintenance }
]

export default defineComponent({
  setup() {
    return () => <Tabs>
      {
        tabList.map(item => <Tabs.TabPane key={item.value} tab={item.text}>
          <item.component />
        </Tabs.TabPane>)
      }
    </Tabs>
  }
})