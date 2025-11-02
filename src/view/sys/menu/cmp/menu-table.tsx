import { Button } from "antd"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"
import type { ActionType, ProColumns } from "@ant-design/pro-components"

import { CrudTable, CrudTableOperation } from "@aspen/crud"

import { API } from "@@/api/share/request-tool"
import type { SysMenuEntity } from "@@/api/gen/gen-api"
import CMP from "@@/components"

import MenuForm from "./menu-form"
import type { MenuFormRef } from "./menu-form"

const MenuTable: React.FC = () => {
	const formRef = useRef<MenuFormRef>(null)
	const actionRef = useRef<ActionType>(null)

	const [loadingObj, setLoadingObj] = useState({ table: false })

	const columns: Array<ProColumns<SysMenuEntity>> = [
		{
			title: "排序",
			key: "sort",
			dataIndex: ["sort"],
		},
		{
			title: "菜单名称",
			dataIndex: "menuName",
		},
		{
			title: "菜单类型",
			dataIndex: ["type"],
			render: (dom, entity) => {
				return <CMP.dict.tag dictType="sys_menu_type" dictItemCode={entity.type} />
			},
		},
		{
			title: "菜单位置",
			dataIndex: ["position"],
			render: (dom, entity) => {
				return <CMP.dict.tag dictType="sys_menu_position" dictItemCode={entity.position} />
			},
		},
		{
			title: "路由地址",
			dataIndex: "path",
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
							onClick={() => formRef.current?.open(entity.menuId)}
						>
							编辑
						</Button>
						<Button variant="text" color="danger" icon={<DeleteOutlined />} onClick={() => deleteMenu(entity)}>
							删除
						</Button>
					</div>
				)
			},
		},
	]

	// 获取系统菜单列表
	const getList = async (page: number = 1, pageSize: number = 10) => {
		try {
			setLoadingObj({ table: true })
			const _params: any = {
				page: page,
				pageSize: pageSize,
			}
			const { data } = await API.sys.sysMenuControllerPage(_params)
			return {
				data: data.records || [],
				success: true,
				total: data.totalRecord || 0,
			}
		} catch (error) {
			console.error("|获取系统菜单列表|意外的错误,error:", error)
		} finally {
			setTimeout(() => setLoadingObj({ table: false }), 500)
		}
	}

	// 删除菜单
	const deleteMenu = async (entity: SysMenuEntity) => {
		window.$modal.confirm({
			title: "警告",
			content: `菜单${entity.menuName}(${entity.path})确认删除吗?`,
			onOk: async () => {
				// 判断是否有子菜单
				await API.sys.sysMenuControllerDelete([String(entity.menuId)])
				actionRef.current?.reload()
				window.$message.success("删除成功")
			},
		})
	}

	return (
		<>
			<CrudTable
				actionRef={actionRef}
				rowKey="menuId"
				headerTitle="系统菜单"
				columns={columns}
				search={false}
				loading={loadingObj.table}
				request={({ current, pageSize }) => {
					return getList(current, pageSize)
				}}
				toolBarRender={() => [<CrudTableOperation onAdd={() => formRef.current?.open(null)} />]}
			/>
			<MenuForm ref={formRef} onRefresh={() => actionRef.current?.reload()} />
		</>
	)
}

export default MenuTable
