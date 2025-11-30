import React from "react"

import { Flex, TreeSelect, Typography } from "antd"
import type { TreeSelectProps } from "antd"
import { FolderOpenOutlined, FolderOutlined } from "@ant-design/icons"

import TOOL from "@/module/tool"
import { API } from "@@/api/share/request-tool"

import "./cmp/menu-form"

type Props = {
	value?: string | Array<string>
	onChange?: (value: string | Array<string>) => void
	/**
	 * 选择的类型
	 * catalogue: 目录
	 * menu: 菜单
	 * @default catalogue,menu
	 */
	selectTypes?: Array<"catalogue" | "menu">
	/**
	 * 是否开启多选
	 * @default false
	 */
	multiple?: boolean
	/**
	 * 是否禁止选择自己
	 * @default false
	 */
	disableSelf?: boolean
}

const { Text } = Typography

const notExistRootMenuId = "-99"

const MenuTreeCmpSelect: React.FC<Props> = (props) => {
	const {
		value = null,
		onChange = null,
		selectTypes = ["catalogue", "menu"],
		multiple = false,
		disableSelf = false,
	} = props

	const [treeData, setTreeData] = useState([])
	const [expandedKeys, setExpandedKeys] = useState([])
	const deferredExpandedKeys = useDeferredValue(expandedKeys)

	useEffect(() => {
		if (value !== null && treeData.length === 0) {
			getMenuTree()
		}
	}, [value])

	const displayValue = useMemo(() => {
		if (!treeData || !treeData.length) return null
		if (multiple) {
			if (Array.isArray(value)) return value
			if (value) return [value]
			return []
		}
		if (Array.isArray(value)) {
			return value[0]
		}
		return value || null
	}, [value, multiple, treeData])

	const tryGetOptions: TreeSelectProps["onOpenChange"] = async (open) => {
		if (!open) return
		getMenuTree()
	}

	// 查询菜单树
	const getMenuTree = async () => {
		try {
			const _params: any = {}
			const { data } = await API.sys.sysMenuControllerTree(_params)
			const convTreeData = TOOL.tree.map(data, (entity) => {
				const isAdd = entity.type === "200"
				let disabled = false
				if (selectTypes.length == 1) {
					if (!selectTypes.includes("catalogue") && entity.roleType === "200") {
						disabled = true
					}
					if (!selectTypes.includes("menu") && entity.roleType === "100") {
						disabled = true
					}
				}
				// 禁止选择自己
				if (disableSelf && entity.menuId === value) {
					disabled = true
				}
				return {
					title: entity.menuName,
					value: entity.menuId,
					key: entity.menuId,
					isLeaf: !entity.children?.length,
					icon: (tree: any) => {
						// 有子节点时,显示文件夹
						if (tree.data.children?.length || isAdd) {
							return tree.expanded ? <FolderOpenOutlined /> : <FolderOutlined />
						}
						return <FolderOutlined />
					},
					disabled: disabled,
					extra: {
						isAdd: isAdd,
					},
				}
			})
			// 创建一个默认的expandedKeys
			const defaultExpandedKeys = TOOL.tree
				.flatten(data)
				?.filter((node) => node.menuId === notExistRootMenuId || node.parentId === notExistRootMenuId)
				?.map((node) => node.menuId)

			setExpandedKeys((prev) => Array.from(new Set([...prev, ...defaultExpandedKeys])))
			setTreeData(convTreeData)
		} catch (error) {
			console.error("|查询菜单树|意外的错误,error:", error)
		}
	}

	// 菜单树选择 onChange
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
			placeholder="请选择菜单"
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

export default MenuTreeCmpSelect
