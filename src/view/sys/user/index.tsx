import { type ActionType, type ProColumns } from "@ant-design/pro-components"

import { Button, Card, Flex, Switch, Tag } from "antd"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"
import { useSetState } from "ahooks"

import { CrudTable, CrudTableOperation } from "@aspen/crud"

import CMP from "@@/components"
import { API } from "@@/api/share/request-tool"
import type { SysUserEntity, SysUserQueryDto } from "@@/api/gen/gen-api"

import type { UserFormRef } from "./cmp/user-form"

const UserForm = lazy(() => import("./cmp/user-form"))
const DeptOrgCmp = lazy(() => import("./cmp/dept-org"))

const UserPage: React.FC = () => {
	const formRef = useRef<UserFormRef>(null)
	const actionRef = useRef<ActionType>(null)

	const [searchParams, setSearchParams] = useSetState<SysUserQueryDto>({})
	const [viewType, setViewType] = useState<"user" | "dept">("user")
	const [loadingObj, setLoadingObj] = useState({ table: false })

	const columns: Array<ProColumns<SysUserEntity>> = [
		{
			title: "聚合查询",
			dataIndex: ["quick"],
			fieldProps: {
				placeholder: "请输入登录名、用户昵称、用户手机号",
			},
			hideInTable: true,
		},
		{
			title: "排序",
			key: "sort",
			dataIndex: ["sort"],
			search: false,
		},
		{
			title: "用户名",
			key: "username",
			dataIndex: "username",
			copyable: true,
			search: false,
		},
		{
			title: "昵称",
			dataIndex: "userNickname",
			search: false,
		},
		{
			title: "手机号",
			dataIndex: "mobile",
			search: false,
		},
		{
			title: "部门",
			dataIndex: "userDepts",
			search: false,
			render: (dom, entity) => {
				return <Flex gap={4}>{entity.userDepts?.map((item) => <Tag key={item.deptId}>{item.deptName}</Tag>)}</Flex>
			},
		},
		{
			title: "角色",
			dataIndex: "roleIds",
			render: (dom, entity) => {
				return <Flex gap={4}>{entity.userRoles?.map((item) => <Tag key={item.roleId}>{item.roleName}</Tag>)}</Flex>
			},
			renderFormItem() {
				return <CMP.sysRole.RoleSelect mode="multiple" />
			},
		},
		{
			title: "是否启用",
			key: "enable",
			dataIndex: "enable",
			render: (dom, entity) => {
				return (
					<Switch
						value={entity.enable}
						onChange={() => editUserEnable(entity)}
						checkedChildren="启用"
						unCheckedChildren="禁用"
					/>
				)
			},
			renderFormItem() {
				return <CMP.dict.select dictType="com_enable" />
			},
		},
		{
			title: "操作",
			width: 120,
			align: "center",
			valueType: "option",
			fixed: true,
			render: (dom, entity) => {
				return (
					<div className="flex gap-1">
						<Button
							variant="text"
							color="primary"
							icon={<FormOutlined />}
							onClick={() => formRef.current?.open(entity.userId)}
						>
							编辑
						</Button>
						<Button variant="text" color="danger" icon={<DeleteOutlined />} onClick={() => deleteUser(entity)}>
							删除
						</Button>
					</div>
				)
			},
		},
	]

	// 编辑用户启用状态
	const editUserEnable = async (entity: SysUserEntity) => {
		await API.sys.sysUserControllerEdit({ ...entity, enable: !entity.enable } as any)
		actionRef.current?.reload()
		window.$message.success("操作成功")
	}

	// 删除用户
	const deleteUser = async (entity: SysUserEntity) => {
		window.$modal.confirm({
			title: "警告",
			content: `用户${entity.userNickname}(${entity.username})确认删除吗?`,
			onOk: async () => {
				await API.sys.sysUserControllerDelete([String(entity.userId)])
				actionRef.current?.reload()
				window.$message.success("删除成功")
			},
		})
	}

	// 获取系统用户列表
	const getList = async (current: number, pageSize: number, params: SysUserQueryDto) => {
		try {
			setLoadingObj({ table: true })
			const _params = {
				page: current || 1,
				pageSize: pageSize || 10,
				...params,
				...searchParams,
			}
			const { data } = await API.sys.sysUserControllerPage(_params)
			return {
				data: data.records || [],
				success: true,
				total: data.totalRecord || 0,
			}
		} catch (error) {
			console.error("|获取系统用户列表|意外的错误,error:", error)
		} finally {
			setTimeout(() => setLoadingObj({ table: false }), 500)
		}
	}

	return (
		<Flex className="full">
			<Card className="min-w-85 w-20% h-full mr-3" styles={{ body: { height: "100%" } }}>
				<CMP.sysDept.DeptTree
					title={null}
					viewType={viewType}
					viewTypeChange={(next) => startTransition(() => setViewType(next))}
					onCheck={(deptIds) => {
						if (viewType === "user") {
							setSearchParams({ deptIds })
							actionRef.current?.reload()
						}
					}}
				/>
			</Card>
			{viewType == "user" ? (
				<Flex className="flex-1" vertical gap={12}>
					<Card className="flex-1 h-full" styles={{ body: { height: "100%" } }}>
						<CrudTable
							search={{
								className: "p-x-0! p-y-2!",
							}}
							cardProps={false}
							className="h-full"
							actionRef={actionRef}
							rowKey="userId"
							headerTitle="系统用户"
							columns={columns}
							loading={loadingObj.table}
							request={({ current, pageSize, ...rest }) => {
								return getList(current, pageSize, rest)
							}}
							toolBarRender={() => [<CrudTableOperation onAdd={() => formRef.current?.open(null)} />]}
						/>
						<UserForm ref={formRef} onRefresh={() => actionRef.current?.reload()} />
					</Card>
				</Flex>
			) : (
				<DeptOrgCmp />
			)}
		</Flex>
	)
}

export default UserPage
