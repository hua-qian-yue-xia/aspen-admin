import { Button, Switch } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { ActionType, ProColumns } from "@ant-design/pro-components"

import { CrudTable, CrudTableOperation } from "@aspen/crud"

import { SysUserEntity } from "@/module/api/gen/gen-api"
import { API } from "@/module/api/share/request-tool"

const TablePage = () => {
	const actionRef = useRef<ActionType>(null)

	const columns: Array<ProColumns<SysUserEntity>> = [
		{
			title: "排序",
			dataIndex: ["sort", "sort"],
			tooltip: "倒序,数值越大越在前",
		},
		{
			title: "用户名",
			dataIndex: "username",
			render: (dom, entity) => {
				return (
					<Button className="px-0" color="primary" variant="link">
						{entity.username}
					</Button>
				)
			},
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
			tooltip: "禁用用户将不能登录",
			render: (dom, entity) => {
				return <Switch value={entity.enable} checkedChildren="启用" unCheckedChildren="禁用" />
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
						<Button variant="text" color="danger" icon={<DeleteOutlined />} onClick={() => deleteUser(entity)}>
							删除
						</Button>
					</div>
				)
			},
		},
	]

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
		<CrudTable
			rowKey="userId"
			headerTitle="系统用户"
			columns={columns}
			search={false}
			request={({ current, pageSize }) => {
				return getList(current, pageSize)
			}}
			toolBarRender={() => [<CrudTableOperation onAdd={() => console.log("新增")} />]}
		/>
	)
}

export default TablePage
