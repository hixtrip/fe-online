export interface Org {
  id: number
  name: string
  isLeaf: boolean
  children?: Array<Org>
}
