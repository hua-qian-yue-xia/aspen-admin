import React from "react"

import { Flex, TreeSelect, Typography } from "antd"
import type { TreeSelectProps } from "antd"
import { FolderOpenOutlined, FolderOutlined, TagOutlined } from "@ant-design/icons"

import TOOL from "@/module/tool"

import { API } from "@@/api/share/request-tool"

import "./role-tree"

type Props = {
	value?: string | Array<string>
	onChange?: (value: string | Array<string>) => void
	/**
	 * 选择的类型
	 * catalogue: 目录角色
	 * dept: 角色
	 * @default catalogue,role
	 */
	selectTypes?: Array<"catalogue" | "role">
	/**
	 * 是否开启多选
	 * @default false
	 */
	multiple?: boolean
}

const { Text } = Typography

const RoleTreeSelectCmp: React.FC<Props> = (props) => {
	const { value = null, onChange = null, selectTypes = ["catalogue", "role"], multiple = false } = props

	const [treeData, setTreeData] = useState([])
	const [expandedKeys, setExpandedKeys] = useState([])
	const deferredExpandedKeys = useDeferredValue(expandedKeys)

	useEffect(() => {
		if (value !== null && treeData.length === 0) {
			getRoleTree()
		}
	}, [value])

	const displayValue = useMemo(() => {
		if (multiple) {
			if (Array.isArray(value)) return value
			if (value) return [value]
			return []
		}
		if (Array.isArray(value)) {
			return value[0]
		}
		return value || null
	}, [value, multiple])

	const tryGetOptions: TreeSelectProps["onOpenChange"] = async (open) => {
		if (!open) return
		getRoleTree()
	}

	// 获取角色role树
	const getRoleTree = async () => {
		try {
			const _params: any = {}
			const { data } = await API.sys.sysRoleControllerTree(_params)
			const convTreeData = TOOL.tree.map(data, (entity) => {
				const isAdd = entity.roleType === "200"
				let disabled = false
				if (selectTypes.length == 1) {
					if (!selectTypes.includes("catalogue") && entity.roleType === "200") {
						disabled = true
					}
					if (!selectTypes.includes("role") && entity.roleType === "100") {
						disabled = true
					}
				}
				return {
					title: entity.roleName,
					value: entity.roleId,
					key: entity.roleId,
					isLeaf: !entity.children?.length,
					icon: (tree: any) => {
						// 有子节点时,显示文件夹
						if (tree.data.children?.length || isAdd) {
							return tree.expanded ? <FolderOpenOutlined /> : <FolderOutlined />
						}
						return <TagOutlined />
					},
					disabled: disabled,
					extra: {
						isAdd: entity.roleType === "200",
						parentKey: entity.parentRoleId,
					},
				}
			})
			// 创建一个默认的expandedKeys
			const defaultExpandedKeys = TOOL.tree
				.flatten(data)
				?.filter((node) => node.roleId === "-99" || node.parentRoleId === "-99")
				?.map((node) => node.roleId)
			setExpandedKeys((prev) => Array.from(new Set([...prev, ...defaultExpandedKeys])))
			setTreeData(convTreeData)
		} catch (error) {
			console.error("|获取角色role树|意外的错误,error:", error)
		}
	}

	// 角色树选择 onChange
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
			placeholder="请选择角色"
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

export default RoleTreeSelectCmp
