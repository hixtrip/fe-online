import delay from '../utils/delay'
interface Org {
  id: string
  name: string
  isLeaf: boolean // 是否最后一级,非一次性全部数据就需要,非最后一级可以展开,本列子只预留,不做处理(如用成熟ui框架,直接给字段即可,不用处理)
  children?: Array<Org> // 存放子集
}
const getOrgData = (): Org[] => {
  const count = Math.floor(Math.random() * 20)
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: Math.random() + '',
        name: (Math.random() + 1).toString(36).substring(7),
        isLeaf: Math.random()>0.5,
      }
    })
}

const query = (parentId: string = '0') => {
  return delay(getOrgData())
}

const orgApi = {
  query,
}

export default orgApi
