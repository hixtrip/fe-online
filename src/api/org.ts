import delay from '../utils/delay'

export interface Org {
  id: string
  name: string
  isLeaf?: boolean
}

const getOrgData = (parentId: string): Org[] => {
  const count = Math.floor(Math.random() * 20)
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        parentId,
        id: Math.random() + '',
        name: (Math.random() + 1).toString(36).substring(7),
        isLeaf: Math.random() > 0.5, // 需要判断是否叶子节点
      }
    })
}

const query = (parentId: string = '0') => {
  return delay(getOrgData(parentId))
}

const orgApi = {
  query,
}

export default orgApi
