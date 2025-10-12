import { ProTable } from "@ant-design/pro-components"
import type { ActionType, ProColumns } from "@ant-design/pro-components"

import { Button, Input, Switch } from "antd"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"

import { API } from "@@/api/share/request-tool"
import type { SysUserEntity } from "@@/api/gen/gen-api"

import type { UserFormRef } from "./components/user-form"

const UserForm = lazy(() => import("./components/user-form"))

const UserPage: React.FC = () => {
	const userFormRef = useRef<UserFormRef>(null)
	const actionRef = useRef<ActionType>(null)

	const columns: Array<ProColumns<SysUserEntity>> = [
		{
			title: "排序",
			dataIndex: ["sort", "sort"],
		},
		{
			title: "用户名",
			dataIndex: "username",
		},
		{
			title: "用户昵称",
			dataIndex: "userNickname",
		},
		{
			title: "用户手机号",
			dataIndex: "mobile",
			render: (dom, entity, index, action) => {
				return <div onClick={() => action.startEditable(entity.userId, ["mobile"])}>{entity.mobile}</div>
			},
			editable: () => true,
			renderFormItem: () => {
				return <Input />
			},
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
							onClick={() => userFormRef.current?.open(entity.userId)}
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
			const _params = {
				page: page,
				pageSize: pageSize,
			}
			const { data } = (await API.sys.sysUserControllerPage(_params)).data
			return {
				data: data.records || [],
				success: true,
				total: data.totalRecord || 0,
			}
		} catch (error) {
			console.error("|获取系统用户列表|意外的错误,error:", error)
		}
	}

	return (
		<div>
			<ProTable
				options={{
					fullScreen: true,
				}}
				actionRef={actionRef}
				request={({ current, pageSize }) => {
					return getList(current, pageSize)
				}}
				headerTitle={
					<div>
						<Button type="primary" onClick={() => userFormRef.current?.open(null)}>
							新增
						</Button>
					</div>
				}
				columns={columns}
				rowKey="userId"
				cardBordered
				search={false}
				pagination={{
					pageSize: 10,
					onChange: (page) => console.log(page),
				}}
				toolBarRender={() => [<div key="custom-toolbar">1231231231231</div>]}
				// optionsRender={() => [
				// 	<Button type="primary" onClick={() => userFormRef.current?.open(null)}>
				// 		新增
				// 	</Button>,
				// ]}
			/>

			<UserForm ref={userFormRef} onRefresh={() => actionRef.current?.reload()} />
		</div>
	)
}

export default UserPage
