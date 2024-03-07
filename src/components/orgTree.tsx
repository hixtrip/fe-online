import React, {useState, useEffect} from 'react'
import userApi from '../api/user'
export default function OrgTree(props: React.FC) {
	const [treeData, setTreeData] = useState([
		{
			id: 1,
			pId: 0,
			value: '1',
			title: 'Expand to load1',
		},
		{
			id: 2,
			pId: 0,
			value: '2',
			title: 'Expand to load2',
		},
		{
			id: 3,
			pId: 0,
			value: '3',
			title: 'Tree Node',
			isLeaf: true,
		},
	])

	useEffect(() => {
		getUserApi()
	}, [])

	const genTreeNode = (node: any, isLeaf = false) => {
		const random = Math.random().toString(36).substring(2, 6)
		return {
			id: random,
			pId: node.parentId,
			value: random,
			title: `${node.title} load_children${random}`,
			isLeaf,
		}
	}

	const TreeNode = ({node}: any) => {
		const nodeClick = (e: any, node: any) => {
			// 阻止事件冒泡
			e.stopPropagation()
			console.log(node, 'node')
			let newTreeData = cloneDeep(treeData)

			// 根据节点的id查询树形数据中的对应节点
			const modifiedTreeData = modifyNodeById(newTreeData, node.id, {
				isOpen: !node.isOpen,
			})

			const level = getNodeLevel(modifiedTreeData, node.id)
			console.log(level, 'level')
			// 如果层数超过3 层，不再添加子节点
			if (level >= 3) {
				console.log(props)
				props.treeClickFunc(node)
				return
			}
			// 如果节点没有子节点
			if (!node.children) {
				new Promise((resolve) => {
					setTimeout(() => {
						// newTreeData[targetIndex].children = [
						// 	genTreeNode(node, true),
						// 	genTreeNode(node, false),
						// 	genTreeNode(node, false),
						// ]

						// 根据节点的id查询树形数据中的对应节点
						const openModifiedTreeData = modifyNodeById(
							modifiedTreeData,
							node.id,
							{
								children: [
									genTreeNode(node, true),
									genTreeNode(node, false),
									genTreeNode(node, false),
								],
							},
						)
						// if (!node.children) {
						// } else {
						// }
						console.log(modifiedTreeData)

						setTreeData(openModifiedTreeData)
						console.log(newTreeData, 'newTreeData')

						resolve(undefined)
					}, 300)
				})
			} else {
				// 如果节点有子节点
				const modifiedCloseTreeData = modifyNodeById(
					modifiedTreeData,
					node.id,
					{
						isOpen: !node.isOpen,
					},
				)
				console.log(modifiedCloseTreeData)
				// console.log(modifiedTreeData)
				//
				setTreeData(modifiedCloseTreeData)
			}
		}

		return (
			<div
				style={{marginLeft: '10px', cursor: 'pointer'}}
				onClick={(e) => nodeClick(e, node)}
			>
				{node.children?.length && <span>[{node.isOpen ? '-' : '+'}]</span>}
				{node.title}
				{node.children &&
					node.isOpen &&
					node.children.map((child) => (
						<TreeNode key={child.id} node={child} />
					))}
			</div>
		)
	}

	return (
		<div style={{minWidth: '200px'}}>
			{treeData.map((node) => (
				<TreeNode key={node.id} node={node} />
			))}
		</div>
	)
}

function getUserApi() {
	userApi.query({}).then((users) => {
		console.log(users, 'users')

		// document.getElementById('user')!.innerHTML = JSON.stringify(users)
	})
}

function cloneDeep(source, hash = new WeakMap()) {
	if (typeof source !== 'object' || source === null) {
		return source
	}
	if (hash.has(source)) {
		return hash.get(source)
	}
	const target = Array.isArray(source) ? [] : {}
	Reflect.ownKeys(source).forEach((key) => {
		const val = source[key]
		if (typeof val === 'object' && val != null) {
			target[key] = cloneDeep(val, hash)
		} else {
			target[key] = val
		}
	})
	return target
}

/**
 * 根据子节点的id查询树形数据中的父节点
 * @param {Object[]} data - 树形数据
 * @param {string} nodeId - 子节点的id
 * @returns {Object|null} 返回具有目标id的父节点对象,如果未找到则返回null
 */
function findParentNodeById(data, nodeId) {
	// 遍历数据
	for (const node of data) {
		// 如果当前节点就是目标节点,则返回null(因为根节点没有父节点)
		if (node.id === nodeId) {
			return null
		}

		// 如果当前节点有子节点
		if (node.children && node.children.length > 0) {
			// 递归查找子节点
			const parentNode = findParentNodeById(node.children, nodeId)

			// 如果找到了父节点,则返回
			if (parentNode) {
				return parentNode
			}
		}
	}

	// 如果遍历完整个树形数据都没有找到,则返回null
	return null
}

/**
 * 根据节点的id查询树形数据中的对应节点
 * @param {Object[]} data - 树形数据
 * @param {string} nodeId - 目标节点的id
 * @returns {Object|null} 返回具有目标id的节点对象,如果未找到则返回null
 */
function findNodeById(data, nodeId) {
	// 遍历数据
	for (const node of data) {
		// 如果当前节点就是目标节点,则返回该节点
		if (node.id === nodeId) {
			return node
		}

		// 如果当前节点有子节点
		if (node.children && node.children.length > 0) {
			// 递归查找子节点
			const foundNode = findNodeById(node.children, nodeId)

			// 如果在子节点中找到了目标节点,则返回
			if (foundNode) {
				return foundNode
			}
		}
	}

	// 如果遍历完整个树形数据都没有找到,则返回null
	return null
}

/**
 * 根据 id 定位并修改树形结构中的子元素
 * @param {Object[]} data - 树形数据
 * @param {string} nodeId - 要修改的节点 id
 * @param {Object} newNodeData - 新的节点数据
 * @returns {Object[]} 返回修改后的树形数据
 */
function modifyNodeById(data: any, nodeId: any, newNodeData: any) {
	// 遍历数据
	for (let i = 0; i < data.length; i++) {
		const node = data[i]

		// 如果当前节点就是目标节点
		if (node.id === nodeId) {
			// 修改当前节点
			data[i] = {...node, ...newNodeData}
			return data
		}

		// 如果当前节点有子节点
		if (node.children && node.children.length > 0) {
			// 递归修改子节点
			const modifiedChildren = modifyNodeById(
				node.children,
				nodeId,
				newNodeData,
			)

			// 如果子节点被修改了，则更新当前节点的子节点列表
			if (modifiedChildren !== node.children) {
				data[i] = {...node, children: modifiedChildren}
			}
		}
	}

	// 如果遍历完整个树形数据都没有找到目标节点，则返回原始数据
	return data
}

/**
 * 获取节点所在的层级
 * @param {Object[]} data - 树形数据
 * @param {string} nodeId - 目标节点 id
 * @param {number} level - 当前层级，初始值为 0
 * @returns {number} 返回目标节点所在的层级，如果未找到则返回 -1
 */
function getNodeLevel(data, nodeId, level = 0) {
	// 遍历数据
	for (const node of data) {
		// 如果当前节点就是目标节点，则返回当前层级
		if (node.id === nodeId) {
			return level
		}

		// 如果当前节点有子节点
		if (node.children && node.children.length > 0) {
			// 递归查找子节点，层级加 1
			const foundLevel = getNodeLevel(node.children, nodeId, level + 1)

			// 如果在子节点中找到了目标节点，则返回其层级
			if (foundLevel !== -1) {
				return foundLevel
			}
		}
	}

	// 如果遍历完整个树形数据都没有找到目标节点，则返回 -1
	return -1
}
