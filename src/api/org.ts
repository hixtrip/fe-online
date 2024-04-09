import delay from '../utils/delay'
import type { Org } from './types'

const getOrgData = (): Org[] => {
    const count = Math.floor(Math.random() * 20)
    return Array(count)
        .fill(0)
        .map(() => {
            return {
                id: Math.random() + '',
                name: (Math.random() + 1).toString(36).substring(7),
            }
        })
}

// 未使用的变量应当以 _ 代替
// 这里就不改了
// const query = (_: string = '0') => {
const query = (param: string = '0') => {
    return delay(getOrgData())
}

const orgApi = {
    query,
}

export default orgApi
