import { defineComponent, ref, computed } from 'vue'
import { Row, Col, Flex } from 'ant-design-vue'
import { PlusOutlined, ApartmentOutlined } from '@ant-design/icons-vue'

import OrgTree from './components/OrgTree'
import UserTable from './components/UserTable'

export default defineComponent({
  setup() {
    // @t-ignore 这里偷懒不写泛型了
    const orgList = ref<any[]>([])

    const orgId = computed(
      () => orgList.value.length ? orgList.value[orgList.value.length - 1].id
        : undefined
    )

    return () => <Row class="member-management">
      <Col span={6} class="br">
        <Flex class="member-management__subtitle" justify="space-between" align="center">
          <span>部门</span>
          <PlusOutlined class="member-management--btn" />
        </Flex>

        <OrgTree
          onCheckPath={
            path => { orgList.value = path }
          }
        />
      </Col>

      <Col span={18}>
        <Flex class="member-management__subtitle" align="center">
          <ApartmentOutlined class="mr-10" />
          <div class="member-management__breadcrumbs">
            {
              orgList.value.map((item) => {
                return <span key={item.id}>{item.name}</span>
              })
            }
          </div>
        </Flex>

        <div class="member-management__table">
          <UserTable orgId={orgId.value} />
        </div>
      </Col>
    </Row>
  }
})
