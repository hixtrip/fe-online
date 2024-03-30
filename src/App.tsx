import { defineComponent } from 'vue'
import Content from '@/pages/index'

export default defineComponent({
  setup() {
    return () => <div>
      <Content />
    </div>
  }
})