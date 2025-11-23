import React from "react"

import { Flex, TreeSelect, Typography } from "antd"
import type { TreeDataNode, TreeSelectProps } from "antd"

import { API } from "@@/api/share/request-tool"
import BaseSvgIcon from "~/packages/crud/src/module/base/base-svg-icon"
import { FolderOpenOutlined, FolderOutlined } from "@ant-design/icons"

import TOOL from "@/module/tool"

import "./css/dept-css.scss"

type Props = {
	value?: string | Array<string>
	onChange?: (value: string | Array<string>) => void
}

const { Text } = Typography

const DeptTreeSelectCmp: React.FC<Props> = ({ value = null, onChange = null }) => {
	console.log("DeptTreeSelectCmp value:", value)

	const [treeData, setTreeData] = useState<Array<TreeDataNode>>([])
	const [expandedKeys, setExpandedKeys] = useState([])
	const deferredExpandedKeys = useDeferredValue(expandedKeys)

	useEffect(() => {
		if (value !== null && treeData.length === 0) {
			getDeptTree()
		}
	}, [value])

	const tryGetOptions: TreeSelectProps["onOpenChange"] = async (open) => {
		if (!open) return
		getDeptTree()
	}

	// 获取部门dept树
	const getDeptTree = async () => {
		try {
			const _params: any = {}
			const { data } = await API.sys.sysDeptControllerTree(_params)
			const convTreeData = TOOL.tree.map(data, (entity) => {
				const isAdd = entity.deptType === "200"
				return {
					title: entity.deptName,
					value: entity.deptId,
					key: entity.deptId,
					isLeaf: !entity.children?.length,
					icon: (tree: any) => {
						// 有子节点时,显示文件夹
						if (tree.data.children?.length || isAdd) {
							return tree.expanded ? <FolderOpenOutlined /> : <FolderOutlined />
						}
						return <BaseSvgIcon className="inline" icon="clarity:organization-solid" />
					},
					disabled: !isAdd,
					extra: {
						isAdd: isAdd,
					},
				}
			})
			// 创建一个默认的expandedKeys,deptParentId为-1
			const defaultExpandedKeys = convTreeData.filter((node) => node.key === "-1").map((node) => node.key)
			setExpandedKeys((prev) => [...prev, ...defaultExpandedKeys])
			setTreeData(convTreeData)
		} catch (error) {
			console.error("|获取部门dept树|意外的错误,error:", error)
		}
	}

	// 部门树选择 onChange
	const onTreeSelectChange: TreeSelectProps["onChange"] = (value) => {
		onChange?.(value)
	}

	return (
		<TreeSelect
			value={value}
			treeIcon
			treeLine
			className="full"
			placeholder="请选择部门"
			showSearch
			onOpenChange={tryGetOptions}
			treeData={treeData}
			treeDefaultExpandedKeys={deferredExpandedKeys}
			treeTitleRender={(node) => {
				return (
					<Flex key={node.key} className="w-full" flex={1} align="center" justify="space-between">
						<Text className="min-w-5 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
							{String(node.title)}
						</Text>
					</Flex>
				)
			}}
			onChange={onTreeSelectChange}
		/>
	)
}

export default DeptTreeSelectCmp
