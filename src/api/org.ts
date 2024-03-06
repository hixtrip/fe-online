import delay from '../utils/delay'

export interface Org {
  id: string
  name: string
}
let isFirst = true

function getOrgData(): Org[] {
  const isEmpty = Math.random() > 0.5
  if (!isFirst && isEmpty)
    return []

  isFirst = false
  const count = Math.floor(Math.random() * 20)
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: `${Math.random()}`,
        name: (Math.random() + 1).toString(36).substring(7),
      }
    })
}

function query(parentId: string = '0') {
  return delay(getOrgData())
}

const orgApi = {
  query,
}

export default orgApi
