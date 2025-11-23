import React from "react"

import { Flex, TreeSelect, Typography } from "antd"
import type { TreeSelectProps } from "antd"

import { API } from "@@/api/share/request-tool"
import BaseSvgIcon from "~/packages/crud/src/module/base/base-svg-icon"
import { FolderOpenOutlined, FolderOutlined } from "@ant-design/icons"

import TOOL from "@/module/tool"

import "./css/dept-css.scss"

type Props = {
	value?: string | Array<string>
	onChange?: (value: string | Array<string>) => void
	/**
	 * 选择的类型
	 * catalogue: 目录部门
	 * dept: 部门
	 * @default catalogue,dept
	 */
	selectTypes?: Array<"catalogue" | "dept">
	/**
	 * 是否开启多选
	 * @default false
	 */
	multiple?: boolean
}

const { Text } = Typography

const DeptTreeSelectCmp: React.FC<Props> = (props) => {
	const { value = null, onChange = null, selectTypes = ["catalogue", "dept"], multiple = false } = props

	const [treeData, setTreeData] = useState([])
	const [expandedKeys, setExpandedKeys] = useState([])
	const deferredExpandedKeys = useDeferredValue(expandedKeys)

	useEffect(() => {
		if (value !== null && treeData.length === 0) {
			getDeptTree()
		}
	}, [value])

	const displayValue = useMemo(() => {
		if (multiple) {
			if (Array.isArray(value)) return value
			return [value]
		}
		return value || ""
	}, [value, multiple])

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
				let disabled = false
				if (selectTypes.length == 1) {
					if (!selectTypes.includes("catalogue") && entity.deptType === "200") {
						disabled = true
					}
					if (!selectTypes.includes("dept") && entity.deptType === "100") {
						disabled = true
					}
				}
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
					disabled: disabled,
					extra: {
						isAdd: entity.deptType === "200",
						parentKey: entity.deptParentId,
					},
				}
			})
			// 创建一个默认的 expandedKeys：根节点（parentId 为 null/undefined/0/-1）或 id 为 -1
			const defaultExpandedKeys = TOOL.tree
				.flatten(data)
				?.filter((node) => node.deptId === "-1" || node.deptParentId === "-1")
				?.map((node) => node.deptId)
			setExpandedKeys((prev) => Array.from(new Set([...prev, ...defaultExpandedKeys])))
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
			value={displayValue}
			treeCheckable={multiple}
			treeIcon
			treeLine
			className="full"
			placeholder="请选择部门"
			showSearch
			onOpenChange={tryGetOptions}
			treeData={treeData}
			treeExpandedKeys={deferredExpandedKeys}
			onTreeExpand={(keys) => setExpandedKeys(keys as any)}
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

export default memo(DeptTreeSelectCmp)
