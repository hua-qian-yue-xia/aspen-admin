import type { ActionType, ProColumns } from "@ant-design/pro-components"

import { Button, Card, Flex, Switch } from "antd"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"

import { CrudTable, CrudTableOperation } from "@aspen/crud"

import CMP from "@@/components"
import { API } from "@@/api/share/request-tool"
import type { SysUserEntity } from "@@/api/gen/gen-api"

import type { UserFormRef } from "./cmp/user-form"

const UserForm = lazy(() => import("./cmp/user-form"))

const UserPage: React.FC = () => {
	const formRef = useRef<UserFormRef>(null)
	const actionRef = useRef<ActionType>(null)

	const [loadingObj, setLoadingObj] = useState({ table: false })

	const columns: Array<ProColumns<SysUserEntity>> = [
		{
			title: "排序",
			key: "sort",
			dataIndex: ["sort", "sort"],
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
			title: "用户昵称",
			dataIndex: "userNickname",
			search: false,
		},
		{
			title: "用户手机号",
			dataIndex: "mobile",
			search: false,
		},
		{
			title: "是否启用",
			dataIndex: "enable",
			search: false,
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
		},
		{
			title: "操作",
			width: 120,
			align: "center",
			dataIndex: "operation",
			search: false,
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
		await API.sys.sysUserControllerEdit({ ...entity, enable: !entity.enable })
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
	const getList = async (page: number = 1, pageSize: number = 10) => {
		try {
			setLoadingObj({ table: true })
			const _params: any = {
				page: page,
				pageSize: pageSize,
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
				<CMP.tree.dept title={null} />
			</Card>
			<Card className="flex-1 h-full" styles={{ body: { height: "100%" } }}>
				<CrudTable
					cardProps={false}
					className="h-full"
					actionRef={actionRef}
					rowKey="userId"
					headerTitle="系统用户"
					columns={columns}
					loading={loadingObj.table}
					request={({ current, pageSize }) => {
						return getList(current, pageSize)
					}}
					toolBarRender={() => [<CrudTableOperation onAdd={() => formRef.current?.open(null)} />]}
				/>
				<UserForm ref={formRef} onRefresh={() => actionRef.current?.reload()} />
			</Card>
		</Flex>
	)
}

export default UserPage
