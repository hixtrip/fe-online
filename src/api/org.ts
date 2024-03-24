import delay from '../utils/delay'
interface Org {
  id: string
  name: string,
  parentId:string
}
const getOrgData = (parentId:string): Org[] => {
  const count = Math.floor(Math.random() * 20)
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: Math.random() + '',
        name: (Math.random() + 1).toString(36).substring(7),
        parentId:parentId
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
