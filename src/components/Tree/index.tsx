import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";

import styles from "./index.module.less";

interface TreeForm {
  id: string | number;
  name?: string;
  children?: TreeForm[];
}

interface TreeProps {
  /**
   * 树形数据
   */
  data: TreeForm[];
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 点击节点回调
   */
  nodeClick: (org: TreeForm) => void;
  /**
   * 异步加载数据
   */
  loadData?: (org: any) => TreeForm[] | Promise<TreeForm[]>;
  /**
   * 是否最外层tree，内部使用
   */
  isOuter?: boolean;
}

interface TreeItemProps {
  org: TreeForm
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 点击节点回调
   */
  nodeClick: (org: TreeForm) => void;
  /**
   * 异步加载数据
   */
  loadData?: (org: any) => TreeForm[] | Promise<TreeForm[]>;
}

const TreeItem = (props: TreeItemProps) => {
  const { org, disabled, nodeClick, loadData } = props;
  const [isOpen, setOpen] = useState(false);
  const [hasChildren, setHasChildren] = useState(true);
  const [treeItemData, setTreeItemData] = useState<TreeForm>(org)
  const isLoad = useRef(false);

  useEffect(() => {
    if (loadData) {
      setHasChildren(true);
      setTreeItemData({ ...org, children: [] });
    } else {
      if (!org.children || org.children.length === 0) {
        setHasChildren(false);
      } else {
        setHasChildren(true);
      }
      setTreeItemData(org);
    }
  }, [org, loadData])


  const openChildren = async () => {
    setOpen(!isOpen);
    if (!isLoad.current && loadData) {
      let children = await loadData(treeItemData);
      setTreeItemData({ ...treeItemData, children });
      setHasChildren(children.length > 0);
      isLoad.current = true
    }
  }

  return (
    <li
      className={`${styles.treeItem} ${disabled ? styles.disabled : ""}`}
      key={treeItemData.id}
    >
      <span
        className={`${styles.treeIcon} ${isOpen ? styles.treeIconUp : styles.treeIconDown
          }`}
        style={{ visibility: hasChildren ? "visible" : "hidden" }}
        onClick={openChildren}
      />
      <span
        className={styles.treeName}
        onClick={() => {
          !disabled && nodeClick(treeItemData);
        }}
      >
        {treeItemData.name}
      </span>
      {treeItemData?.children && treeItemData?.children?.length > 0 ? (
        <div className={styles.treeChildren} style={{ display: isOpen ? "block" : "none" }}>
          <Tree
            loadData={loadData}
            data={treeItemData.children}
            disabled={disabled}
            nodeClick={nodeClick}
            isOuter={false}
          />
        </div>
      ) : null}
    </li>
  )
};

// 树形组件单独抽离
const Tree = ({ data, nodeClick, disabled = false, loadData, isOuter = true }: TreeProps) => {
  return (
    <div className={`${styles.treeWrapper} ${isOuter ? styles.outer : ""}`}>
      <ul className={styles.tree}>
        {data.map((org) => <TreeItem key={org.id} org={org} disabled={disabled} nodeClick={nodeClick} loadData={loadData} />)}
      </ul>
    </div>
  );
};

export default Tree;
