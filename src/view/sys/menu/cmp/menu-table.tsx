import { Button } from "antd"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"
import type { ActionType, ProColumns } from "@ant-design/pro-components"

import { CrudTable, CrudTableOperation } from "@aspen/crud"

import { API } from "@@/api/share/request-tool"
import type { SysMenuEntity } from "@@/api/gen/gen-api"
import CMP from "@@/components"
import TOOL from "@@/tool"

import type { MenuFormCmpRef } from "@@/components/sys-menu/menu-form"

type Props = {
	reload?: () => void
}

const MenuTableCmp: React.FC<Props> = ({ reload }) => {
	const formRef = useRef<MenuFormCmpRef>(null)
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
							onClick={() => formRef.current?.open(entity.parentId, entity.menuId)}
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
			const { data } = await API.sys.sysMenuControllerTree(_params)
			const tree = data ?? []
			if (tree.length) {
				TOOL.tree.map(tree, (node) => {
					if (!node.children.length) {
						node.children = undefined
					}
					return node
				})
			}
			return {
				data: tree,
				success: true,
				total: 0,
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
				// expandable={{
				// 	rowExpandable: (record) => Array.isArray(record.children) && record.children.length > 0 && false,
				// 	expandedRowRender: (record) => {
				// 		return null
				// 	},
				// }}
				toolBarRender={() => [<CrudTableOperation onAdd={() => formRef.current?.open(null, null)} />]}
			/>
			<CMP.sysMenu.MenuForm
				ref={formRef}
				onRefresh={() => {
					actionRef.current?.reload()
					reload?.()
				}}
			/>
		</>
	)
}

export default MenuTableCmp
