export type DataType = {
  id: string
  name: string
  children?: Array<DataType> | null
  isUnfold?: Boolean
  loading?: Boolean
}
export type OrgData = {
  list: Array<DataType>
}
