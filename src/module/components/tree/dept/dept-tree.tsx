import React, { useEffect, useState } from "react"

import { Button, Flex, Input, Typography, Dropdown, Tree } from "antd"
import type { MenuProps, TreeDataNode, TreeProps } from "antd"

import {
	ExportOutlined,
	SearchOutlined,
	MoreOutlined,
	FolderOutlined,
	FolderOpenOutlined,
	PlusCircleOutlined,
	FormOutlined,
	DeleteOutlined,
} from "@ant-design/icons"

import TOOL from "@/module/tool"
import { API } from "@@/api/share/request-tool"

import BaseSvgIcon from "~/packages/crud/src/module/base/base-svg-icon"

import type { DeptFormCmpRef } from "./cmp/dept-form"

import "./css/dept-css.scss"

const DeptFormCmp = lazy(() => import("./cmp/dept-form"))

const { Text, Title } = Typography

type Props = {
	/**
	 * 标题
	 * @default 部门管理
	 */
	title?: string
	/**
	 * 是否显示部门视图
	 * @default true
	 */
	visibleDeptView?: boolean
	/**
	 * 是否显示导出按钮
	 * @default true
	 */
	visibleExport?: boolean
}

const moreItems: MenuProps["items"] = [
	{ key: "EDIT", icon: <FormOutlined />, label: "编辑" },
	{ key: "DELETE", icon: <DeleteOutlined />, label: "删除" },
]

const DeptTreeCmp: React.FC<Props> = ({ title = "部门管理", visibleDeptView = true, visibleExport = true }) => {
	const formRef = useRef<DeptFormCmpRef>(null)

	const [treeData, setTreeData] = useState<Array<TreeDataNode>>([])
	const [expandedKeys, setExpandedKeys] = useState([])
	const deferredExpandedKeys = useDeferredValue(expandedKeys)
	const [searchText, setSearchText] = useState("")

	useEffect(() => {
		getDeptTree()
	}, [])

	// 获取部门dept树
	const getDeptTree = async () => {
		try {
			const _params: any = {}
			const { data } = await API.sys.sysDeptControllerTree(_params)
			const convTreeData = TOOL.tree.map(data, (entity) => {
				const isAdd = entity.deptType === "200"
				return {
					title: entity.deptName,
					key: entity.deptId,
					isLeaf: !entity.children?.length,
					icon: (tree: any) => {
						// 有子节点时,显示文件夹
						if (tree.data.children?.length || isAdd) {
							return tree.expanded ? <FolderOpenOutlined /> : <FolderOutlined />
						}
						return <BaseSvgIcon className="inline" icon="clarity:organization-solid" />
					},
					extra: {
						isAdd: isAdd,
					},
				}
			})
			// 创建一个默认的expandedKeys,deptParentId为-1
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

	const moreItemsClick = (key: string, node: any) => {
		if (key === "ADD") {
			formRef.current?.open(node.key, null)
			return
		}
		if (key === "EDIT") {
			formRef.current?.open(null, node.key)
			return
		}
		if (key === "DELETE") {
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
					placeholder="搜索部门名称/拼音"
					suffix={<SearchOutlined />}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					className="flex-1"
				/>
				{visibleDeptView && (
					<Flex className="gap-2">
						<Button
							type="primary"
							size="middle"
							icon={<BaseSvgIcon className="inline" icon="clarity:organization-solid" />}
						>
							部门视图
						</Button>
					</Flex>
				)}
			</Flex>
			<Flex vertical flex={1}>
				<Tree
					key={"key"}
					blockNode
					checkable
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
			<DeptFormCmp ref={formRef} onRefresh={getDeptTree} />
		</Flex>
	)
}

export default memo(DeptTreeCmp)
