import React from "react"

import styles from './index.module.less'

type Column = {
  /**
   * 表头显示的名称
   */
  label: string;
  /**
   * 表头显示的名称key
   */
  dataIndex: string;
}

type dataItem = {
  /**
   * 数据id 必传
   */
  id: string;
  [key:string]: any;
}

interface TableProps {
  /**
   * 表头
   */
  columns: Column[];
  /**
   * 数据
   */
  data: dataItem[];
  /**
   * 是否加载中
   */
  loading?: boolean;
  /**
   * 自定义class
   */
  className?: string;
}

const ElTable = (props: TableProps) => {
  const { columns, data, loading, className } = props;
  return ( <table className={`${styles.tableContent} ${className}`}>
    <thead>
      <tr>
        {
          columns.map(column => <th key={column.dataIndex}>{column.label}</th> )
        }
      </tr>
    </thead>
    <tbody>
      {loading && <tr className={styles.loading}>
          <td colSpan={columns.length}>加载中... </td>
        </tr>}
      {data.map((row) => (
        <tr key={row.id}>
          {
            columns.map(column => <td key={column.dataIndex}>{row[column.dataIndex] || '-'}</td> )
          }
        </tr>
      ))}
      {data.length === 0 && (
        <tr>
          <td colSpan={columns.length}>暂无数据</td>
        </tr>
      )}
    </tbody>
  </table>
  )
}

export default ElTable