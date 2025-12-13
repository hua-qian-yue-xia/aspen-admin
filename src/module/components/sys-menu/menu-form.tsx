import { BetaSchemaForm } from "@ant-design/pro-components"
import type { ProFormColumnsType, ProFormInstance } from "@ant-design/pro-components"

import { API } from "@@/api/share/request-tool"
import type { SysMenuEntity } from "@@/api/gen/gen-api"
import CMP from "@@/components"

import SelectMenuPath from "@@/components/select/sys/select-menu-path"

export type MenuFormCmpRef = {
	open: (menuParentId: string, id: string | null) => Promise<void>
}

type Props = {
	onRefresh?: () => void
}

const notExistMenuRoleId = "-99"

const columns: Array<ProFormColumnsType<SysMenuEntity>> = [
	{
		dataIndex: "parentId",
		title: "父级菜单",
		tooltip: "如果为空,则为一级菜单",
		renderFormItem: () => {
			return <CMP.sysMenu.MenuTreeSelect selectTypes={["catalogue"]} />
		},
	},
	{
		valueType: "dependency",
		name: ["type"],
		columns: (values) => {
			if (!values?.type) return []
			let title = "菜单名称"
			if (values.type == 200) {
				title = "目录名称"
			}
			if (values.type == 300) {
				title = "能力/权限名称"
			}
			return [
				{
					dataIndex: "menuName",
					title: title,
					formItemProps: {
						rules: [{ required: true, message: "请输入菜单名称" }],
					},
				},
			]
		},
	},
	{
		dataIndex: "type",
		title: "菜单类型",
		formItemProps: {
			rules: [{ required: true, message: "请选择菜单类型" }],
		},
		renderFormItem: () => {
			return <CMP.dict.select dictType="sys_menu_type" autoSelectFirst placeholder="请选择菜单类型" />
		},
	},
	{
		valueType: "dependency",
		name: ["type"],
		columns: (values) => {
			if (!values?.type) return []
			// 目录
			if (values.type == 200) {
				return [
					{
						dataIndex: "icon",
						title: "图标",
						formItemProps: {
							rules: [{ required: true, message: "请选择图标" }],
						},
						renderFormItem: () => <CMP.icon.select />,
					},
				]
			}
			// 菜单
			if (values.type == 100) {
				return [
					{
						dataIndex: "icon",
						title: "图标",
						formItemProps: {
							rules: [{ required: true, message: "请选择图标" }],
						},
						renderFormItem: () => <CMP.icon.select />,
					},
					{
						dataIndex: "position",
						title: "菜单位置",
						formItemProps: {
							rules: [{ required: true, message: "请选择菜单位置" }],
						},
						renderFormItem: () => {
							return <CMP.dict.select dictType="sys_menu_position" autoSelectFirst placeholder="请选择菜单位置" />
						},
					},
					{
						dataIndex: "path",
						title: "路由地址",
						formItemProps: {
							rules: [{ required: true, message: "请选择菜单路径" }],
						},
						renderFormItem: () => <SelectMenuPath />,
					},
				]
			}
			return []
		},
	},
]

const MenuFormCmp = forwardRef<MenuFormCmpRef, Props>((props, ref) => {
	const formRef = useRef<ProFormInstance>()

	const [open, setOpen] = useState(false)
	const [form, setForm] = useState<SysMenuEntity | null>(null)
	const [loadingObj, setLoadingObj] = useState({
		form: false,
		modal: false,
	})

	const [menuId, setMenuId] = useState<string | null>(null)

	// 新增或修改菜单
	const onFinish = async (values: any) => {
		setLoadingObj({ ...loadingObj, form: true })
		try {
			const api = menuId == null ? API.sys.sysMenuControllerSave : API.sys.sysMenuControllerEdit
			await api({ ...values, menuId })
			props.onRefresh?.()
			window.$message.success(menuId == null ? "新增成功" : "编辑成功")
			setOpen(false)
		} catch (error) {
			console.error("|新增或修改菜单|意外的错误,error:", error)
			setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
			return false
		}
		setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
		return true
	}

	// 查询菜单详情
	const getDetail = async (id: string) => {
		if (!id) return
		try {
			const { data } = await API.sys.sysMenuControllerGetByMenuId(id)
			setForm(data)
			formRef.current.setFieldsValue(data)
		} catch (error) {
			console.error("|查询菜单详情|意外的错误,error:", error)
		}
	}

	useImperativeHandle(ref, () => {
		return {
			open: async (menuParentId: string, id: string | null) => {
				setLoadingObj({ ...loadingObj, modal: true })
				setMenuId(id)
				setOpen(true)
				try {
					if (id == null) {
						setForm({ parentId: menuParentId === notExistMenuRoleId ? null : menuParentId } as any)
						formRef.current.resetFields()
						return
					}
					await getDetail(id)
				} catch (error) {
					console.error("|查询菜单详情|意外的错误,error:", error)
				} finally {
					setTimeout(() => setLoadingObj({ ...loadingObj, modal: false }), 500)
				}
			},
		}
	})

	return (
		<BetaSchemaForm
			shouldUpdate={false}
			formRef={formRef}
			initialValues={form}
			loading={loadingObj.form}
			title={menuId === null ? "新增菜单" : "编辑菜单"}
			open={open}
			columns={columns}
			preserve={false}
			layoutType="ModalForm"
			modalProps={{
				loading: loadingObj.modal,
				forceRender: true,
			}}
			onOpenChange={setOpen}
			onFinish={onFinish}
		/>
	)
})

export default MenuFormCmp
