import React, { useEffect, useState } from "react"

import { Button, Flex, Input, Typography, Dropdown, Tree } from "antd"
import type { MenuProps, TreeDataNode, TreeProps } from "antd"
import { useRequest, useSetState } from "ahooks"

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
import { SysDeptQueryDto } from "@@/api/gen/gen-api"

import BaseSvgIcon from "~/packages/crud/src/module/base/base-svg-icon"

import type { DeptFormCmpRef } from "./dept-form"

import "./css/dept-css.scss"

const DeptFormCmp = lazy(() => import("./dept-form"))

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
	/**
	 * 视图类型
	 * @default dept
	 */
	viewType?: "dept" | "user"
	/**
	 * 视图切换
	 */
	viewTypeChange?: (viewType: Props["viewType"]) => void
	/**
	 * 点击节点时调用
	 */
	onCheck?: (deptIds: Array<string>) => void
}

const moreItems: MenuProps["items"] = [
	{ key: "EDIT", icon: <FormOutlined />, label: "编辑" },
	{ key: "DELETE", icon: <DeleteOutlined />, label: "删除" },
]

const DeptTreeCmp: React.FC<Props> = ({
	title = "部门管理",
	visibleDeptView = true,
	visibleExport = true,
	viewType = "dept",
	viewTypeChange,
	onCheck,
}) => {
	const formRef = useRef<DeptFormCmpRef>(null)

	const [searchParams, setSearchParams] = useSetState<SysDeptQueryDto>({})
	const [treeData, setTreeData] = useState<Array<TreeDataNode>>([])
	const [expandedKeys, setExpandedKeys] = useState([])
	const deferredExpandedKeys = useDeferredValue(expandedKeys)

	useEffect(() => {
		getDeptTree()
	}, [])

	// 判断是否是生成的部门
	const isGenerateDept = (deptId: string) => {
		return deptId.endsWith("-all")
	}

	// 获取生成部门的原始部门id
	const getGenerateDeptId = (deptId: string) => {
		return deptId.replace("-all", "")
	}

	// 获取部门dept树
	const { run: getDeptTree } = useRequest(
		async () => {
			try {
				const { data } = await API.sys.sysDeptControllerTree(searchParams)
				const processData = (list: any[]) => {
					list?.forEach((item) => {
						if (item.children && item.children.length > 0) {
							processData(item.children)
							item.children.unshift({
								...item,
								deptId: `${item.deptId}-all`,
								deptName: "本部门",
								children: [],
							})
						}
					})
				}
				processData(data)

				const convTreeData = TOOL.tree.map(data, (entity) => {
					return {
						title: entity.deptName,
						key: entity.deptId,
						isLeaf: !entity.children?.length,
						icon: (tree: any) => {
							// 有子节点时,显示文件夹
							if (tree.data.children?.length) {
								return tree.expanded ? <FolderOpenOutlined /> : <FolderOutlined />
							}
							return <BaseSvgIcon className="inline" icon="clarity:organization-solid" />
						},
					}
				})
				// 创建一个默认的expandedKeys
				const defaultExpandedKeys = TOOL.tree
					.flatten(data)
					?.filter((node) => node.deptId === "-1" || node.deptParentId === "-1")
					?.map((node) => node.deptId)
				setExpandedKeys((prev) => Array.from(new Set([...prev, ...defaultExpandedKeys])))
				setTreeData(convTreeData)
			} catch (error) {
				console.error("|获取部门dept树|意外的错误,error:", error)
			}
		},
		{ throttleWait: 500 },
	)

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
			window.$modal.confirm({
				title: "警告",
				content: `部门${node.deptName}确认删除吗?`,
				onOk: async () => {
					await API.sys.sysDeptControllerDelete([node.key])
					getDeptTree()
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

	const treeCheck: TreeProps["onCheck"] = (checkedKeys) => {
		let deptIds = (checkedKeys as any)?.map((key) => getGenerateDeptId(key as string)) ?? []
		deptIds = Array.from(new Set(deptIds))
		onCheck?.(deptIds)
	}

	return (
		<Flex vertical className="full">
			{title && <Title level={5}>{title}</Title>}
			<Flex align="center" justify="space-between" className="p-x-2 p-y-2 m-b-2 gap-2">
				<Input
					allowClear
					placeholder="搜索部门名称/拼音"
					suffix={<SearchOutlined />}
					value={searchParams.deptNameLike}
					onChange={(e) => {
						setSearchParams({ deptNameLike: e.target.value })
						getDeptTree()
					}}
					className="flex-1"
				/>
				{visibleDeptView && (
					<Flex className="gap-2">
						<Button
							type="primary"
							size="middle"
							icon={<BaseSvgIcon className="inline" icon="clarity:organization-solid" />}
							onClick={() => {
								viewTypeChange?.(viewType === "dept" ? "user" : "dept")
							}}
						>
							{viewType !== "dept" ? "部门视图" : "用户列表"}
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
					onSelect={treeSelect}
					onCheck={treeCheck}
					titleRender={(node) => {
						return (
							<Flex
								key={node.key}
								className="w-full"
								style={{
									minHeight: "var(--ant-control-height)",
								}}
								flex={1}
								align="center"
								justify="space-between"
							>
								<Text className="min-w-5 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
									{String(node.title)}
								</Text>
								{!isGenerateDept(node.key as string) && (
									<Flex>
										<Button
											type="text"
											icon={<PlusCircleOutlined className="color-primary" />}
											onClick={(e) => {
												e.stopPropagation()
												moreItemsClick("ADD", node)
											}}
										/>
										<Dropdown
											open={false}
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
								)}
							</Flex>
						)
					}}
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
