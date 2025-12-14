import React from "react"
import { Button, Dropdown, Empty, Flex, Input, Typography } from "antd"
import {
	DeleteOutlined,
	ExportOutlined,
	FormOutlined,
	MoreOutlined,
	PlusOutlined,
	SearchOutlined,
	TagOutlined,
} from "@ant-design/icons"

import { useRequest, useSetState } from "ahooks"

import { mergeClass } from "@aspen/common"

import { API } from "@@/api/share/request-tool"
import type { SysRoleEntity, SysRoleQueryDto } from "@@/api/gen/gen-api"

import type { RoleFormCmpRef } from "./role-form"

const RoleFormCmp = lazy(() => import("./role-form"))

const { Text, Title } = Typography

type Props = {
	/**
	 * 标题
	 * @default 角色管理
	 */
	title?: string
	/**
	 * 是否显示导出按钮
	 * @default true
	 */
	visibleExport?: boolean
	/**
	 * 点击角色回调
	 */
	onActive?: (roleId: string | null) => void
}

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

const RoleListCmp: React.FC<Props> = ({ title = "角色管理", visibleExport = true, onActive }) => {
	const roleFormRef = useRef<RoleFormCmpRef>(null)

	const [activeDictId, setActiveDictId] = useState(null)

	const [roleList, setRoleList] = useState<Array<SysRoleEntity>>([])
	const [total, setTotal] = useState(0)

	const [searchParams, setSearchParams] = useSetState<SysRoleQueryDto>({} as any)

	useEffect(() => {
		getRolePage()
	}, [])

	// 查询角色分页
	const { run: getRolePage } = useRequest(
		async () => {
			try {
				const { data } = await API.sys.sysRoleControllerScopePage({
					page: 1,
					pageSize: 999,
					searchParams,
				})
				setRoleList(data.records ?? [])
				setTotal(data.totalPage ?? 0)
				if (!activeDictId) {
					const firstRoleId = data?.records?.[0]?.roleId || null
					setActiveDictId(firstRoleId)
					onActive?.(firstRoleId)
				}
			} catch (error) {
				console.error("|查询角色分页|意外的错误,error:", error)
			}
		},
		{ debounceWait: 500, manual: true },
	)

	const moreItemsClick = (key: string, entity: SysRoleEntity) => {
		if (key === "EDIT") {
			roleFormRef.current?.open(entity.roleId)
			return
		}
		if (key === "DELETE") {
			return
		}
	}

	return (
		<Flex vertical className="full">
			{title && <Title level={5}>{title}</Title>}
			<Flex align="center" justify="space-between" className="p-x-2 p-y-2 m-b-2 gap-2">
				<Input
					allowClear
					placeholder="搜索角色名称/编码"
					value={searchParams.quick}
					suffix={<SearchOutlined />}
					onChange={(e) => {
						setSearchParams({ quick: e.target.value })
						getRolePage()
					}}
					className="flex-1"
				/>
				<Button type="primary" icon={<PlusOutlined />} onClick={() => roleFormRef.current?.open(null)} />
			</Flex>
			<Flex vertical flex={1}>
				{total == 0 ? (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				) : (
					roleList.map((v) => (
						<Flex
							key={v.roleId}
							align="center"
							justify="space-between"
							className={mergeClass(
								"p-x-2 p-y-2 m-b-2 rounded-2 cursor-pointer transition-all duration-200 hover:bg-primary/10",
								activeDictId === v.roleId ? "bg-primary/10" : "",
							)}
							onClick={() => {
								setActiveDictId(v.roleId)
								onActive?.(v.roleId)
							}}
						>
							<Flex align="center" justify="center">
								<TagOutlined size={40} />
								<Text strong className="m-l-2 color-primary!">
									{v.roleName}
								</Text>
								<Text className="m-l-2 opacity-70 text-12px">{v.roleCode}</Text>
							</Flex>
							<Flex>
								<Dropdown
									menu={{
										items: moreItems,
										onClick: ({ key, domEvent }) => {
											domEvent?.stopPropagation()
											moreItemsClick(key, v)
										},
									}}
									trigger={["click", "hover"]}
								>
									<Button type="text" icon={<MoreOutlined />} onClick={(e) => e.stopPropagation()} />
								</Dropdown>
							</Flex>
						</Flex>
					))
				)}
			</Flex>
			{visibleExport && (
				<Button className="w-full" type="primary" size="middle" icon={<ExportOutlined />}>
					导出
				</Button>
			)}
			<RoleFormCmp ref={roleFormRef} onRefresh={getRolePage} />
		</Flex>
	)
}

export default RoleListCmp
