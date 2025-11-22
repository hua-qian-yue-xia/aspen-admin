import { Button } from "antd"
import type { ActionType, ProColumns } from "@ant-design/pro-components"

import { CrudTable, CrudTableOperation } from "@aspen/crud"

import { API } from "@@/api/share/request-tool"
import type { SysUserEntity } from "@@/api/gen/gen-api"

const RoleUserListCmp: React.FC = () => {
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
		},
	]

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
		<div className="full">
			<CrudTable
				cardProps={false}
				actionRef={actionRef}
				rowKey="userTable"
				columns={columns}
				search={false}
				loading={loadingObj.table}
				request={({ current, pageSize }) => {
					return getList(current, pageSize)
				}}
				toolBarRender={() => [
					<CrudTableOperation
						visibleAdd={false}
						visibleImport={false}
						leftRender={
							<Button type="primary" color="primary" size="middle">
								授权角色
							</Button>
						}
					/>,
				]}
			/>
		</div>
	)
}

export default RoleUserListCmp
