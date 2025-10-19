import type { ActionType, ProColumns } from "@ant-design/pro-components"

import { Button, Switch } from "antd"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"

import { CrudTable, CrudTableOperation } from "@aspen/crud"

import { API } from "@@/api/share/request-tool"
import type { SysUserEntity } from "@@/api/gen/gen-api"

import type { UserFormRef } from "./components/user-form"

const UserForm = lazy(() => import("./components/user-form"))

const UserPage: React.FC = () => {
	const formRef = useRef<UserFormRef>(null)
	const actionRef = useRef<ActionType>(null)

	const [loadingObj, setLoadingObj] = useState({ table: false })

	const columns: Array<ProColumns<SysUserEntity>> = [
		{
			title: "排序",
			key: "sort",
			dataIndex: ["sort", "sort"],
		},
		{
			title: "用户名",
			key: "username",
			dataIndex: "username",
		},
		{
			title: "用户昵称",
			dataIndex: "userNickname",
		},
		{
			title: "用户手机号",
			dataIndex: "mobile",
		},
		{
			title: "是否启用",
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
		},
		{
			title: "操作",
			width: 120,
			align: "center",
			dataIndex: "operation",
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
		<>
			<CrudTable
				actionRef={actionRef}
				rowKey="userId"
				headerTitle="系统用户"
				columns={columns}
				search={false}
				loading={loadingObj.table}
				request={({ current, pageSize }) => {
					return getList(current, pageSize)
				}}
				toolBarRender={() => [<CrudTableOperation onAdd={() => formRef.current?.open(null)} />]}
			/>
			<UserForm ref={formRef} onRefresh={() => actionRef.current?.reload()} />
		</>
	)
}

export default UserPage
