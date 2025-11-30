import React from "react"

import { Button, Dropdown, Flex, Input, Tree, Typography } from "antd"
import type { TreeDataNode, TreeProps } from "antd"

import {
	DeleteOutlined,
	ExportOutlined,
	FolderOpenOutlined,
	FolderOutlined,
	FormOutlined,
	MoreOutlined,
	PlusCircleOutlined,
	SearchOutlined,
} from "@ant-design/icons"

import TOOL from "@/module/tool"
import { API } from "@@/api/share/request-tool"

import type { MenuFormCmpRef } from "./cmp/menu-form"

import "./cmp/menu-form"

const MenuFormCmp = lazy(() => import("./cmp/menu-form"))

const { Text, Title } = Typography

const notExistRootMenuId = "-99"

const moreItems = [
	{
		key: "EDIT",
		icon: <FormOutlined />,
		label: "编辑",
	},
	{
		key: "DELETE",
		icon: <DeleteOutlined />,
		label: "删除",
	},
]

type Props = {
	/**
	 * 标题
	 * @default 菜单管理
	 */
	title?: string
	/**
	 * 是否显示导出按钮
	 * @default true
	 */
	visibleExport?: boolean
	/**
	 * 是否开启多选
	 * @default false
	 */
	treeCheckable?: boolean
}

const MenuTreeCmp: React.FC<Props> = ({ title = "菜单管理", visibleExport = true, treeCheckable = false }) => {
	const menuFormRef = useRef<MenuFormCmpRef>(null)

	const [treeData, setTreeData] = useState<Array<TreeDataNode>>([])
	const [expandedKeys, setExpandedKeys] = useState([])
	const deferredExpandedKeys = useDeferredValue(expandedKeys)

	const [searchText, setSearchText] = useState("")

	useEffect(() => {
		getMenuTree()
	}, [])

	// 查询菜单树
	const getMenuTree = async () => {
		try {
			const _params: any = {}
			const { data } = await API.sys.sysMenuControllerTree(_params)
			const convTreeData = TOOL.tree.map(data, (entity) => {
				const isAdd = entity.type === "200"
				return {
					title: entity.menuName,
					key: entity.menuId,
					isLeaf: !entity.children?.length,
					icon: (tree: any) => {
						// 有子节点时,显示文件夹
						if (tree.data.children?.length || isAdd) {
							return tree.expanded ? <FolderOpenOutlined /> : <FolderOutlined />
						}
						return <FolderOutlined />
					},
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

	const moreItemsClick = (key: string, node: any) => {
		console.log(node)

		if (key === "ADD") {
			menuFormRef.current?.open(node.key, null)
			return
		}
		if (key === "EDIT") {
			menuFormRef.current?.open(null, node.key)
			return
		}
		if (key === "DELETE") {
			window.$modal.confirm({
				title: "警告",
				content: `菜单:${node.title}(${node.key})确认删除吗?`,
				onOk: async () => {
					await API.sys.sysMenuControllerDelete([node.key])
					getMenuTree()
					window.$message.success("删除成功")
				},
			})
			return
		}
	}

	const treeSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
		// 展开/收起文件夹
		if (info.selected) {
			setExpandedKeys((prev) => [...prev, info.node.key])
		} else {
			setExpandedKeys((prev) => prev.filter((key) => key !== info.node.key))
		}
	}

	return (
		<Flex vertical className="full">
			{title && <Title level={5}>{title}</Title>}
			<Flex align="center" justify="space-between" className="p-x-2 p-y-2 m-b-2 gap-2">
				<Input
					allowClear
					placeholder="搜索菜单名称/路径"
					value={searchText}
					suffix={<SearchOutlined />}
					onChange={(e) => setSearchText(e.target.value)}
					className="flex-1"
				/>
			</Flex>
			<Flex vertical flex={1}>
				<Tree
					blockNode
					checkable={treeCheckable}
					showLine
					showIcon={true}
					treeData={treeData}
					expandedKeys={deferredExpandedKeys}
					onExpand={setExpandedKeys}
					titleRender={(node) => {
						return (
							<Flex key={node.key} className="w-full" flex={1} align="center" justify="space-between">
								<Text className="min-w-5 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
									{String(node.title)}
								</Text>
								<Flex>
									{(node as any)?.extra?.isAdd && (
										<Button
											type="text"
											icon={<PlusCircleOutlined className="color-primary" />}
											onClick={(e) => {
												e.stopPropagation()
												moreItemsClick("ADD", node)
											}}
										/>
									)}
									<Dropdown
										disabled={(node as any)?.extra?.isCatalogueDpet}
										menu={{
											items: moreItems,
											onClick: ({ key, domEvent }) => {
												domEvent?.stopPropagation()
												moreItemsClick(key, node)
											},
										}}
										trigger={["click", "hover"]}
									>
										<Button type="text" icon={<MoreOutlined />} onClick={(e) => e.stopPropagation()} />
									</Dropdown>
								</Flex>
							</Flex>
						)
					}}
					onSelect={treeSelect}
				/>
			</Flex>
			{visibleExport && (
				<Button className="w-full" type="primary" size="middle" icon={<ExportOutlined />}>
					导出
				</Button>
			)}
			<MenuFormCmp ref={menuFormRef} onRefresh={getMenuTree} />
		</Flex>
	)
}

export default memo(MenuTreeCmp)
