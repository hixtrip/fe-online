export interface DataType {
    id: string,
    name: string,
    children?: DataType[] | null,
    childrenCopy?: DataType[] | null
}