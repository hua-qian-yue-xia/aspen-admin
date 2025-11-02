import { BetaSchemaForm } from "@ant-design/pro-components"
import type { ProFormColumnsType, ProFormInstance } from "@ant-design/pro-components"

import { API } from "@@/api/share/request-tool"
import type { SysMenuEntity } from "@@/api/gen/gen-api"
import CMP from "@@/components"

import SelectMenuPath from "@@/components/select/sys/select-menu-path"

export type MenuFormRef = {
	open: (id: number | null) => Promise<void>
}

type Props = {
	onRefresh?: () => void
}

const columns: Array<ProFormColumnsType<SysMenuEntity>> = [
	{
		dataIndex: "parentId",
		title: "父级菜单",
		tooltip: "如果为空,则为一级菜单",
	},
	{
		dataIndex: "menuName",
		title: "菜单名称",
		formItemProps: {
			rules: [{ required: true, message: "请输入菜单名称" }],
		},
	},
	{
		dataIndex: "type",
		title: "菜单类型",
		formItemProps: {
			rules: [{ required: true, message: "请选择菜单类型" }],
		},
		renderFormItem: () => <CMP.dict.select dictType="sys_menu_type" autoSelectFirst placeholder="请选择菜单类型" />,
	},
	{
		valueType: "dependency",
		name: ["type"],
		columns: (values) => {
			if (!values?.type) return []
			// 目录
			if (values.type == 200) return []
			// 菜单
			if (values.type == 100) {
				return [
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
		},
	},
]

const MenuForm = forwardRef<MenuFormRef, Props>((props, ref) => {
	const formRef = useRef<ProFormInstance>()

	const [open, setOpen] = useState(false)
	const [form, setForm] = useState<SysMenuEntity | null>(null)
	const [loadingObj, setLoadingObj] = useState({
		form: false,
		modal: false,
	})

	const [currentMenuId, setCurrentMenuId] = useState<number | null>(null)

	// 新增或修改菜单
	const onFinish = async (values: any) => {
		setLoadingObj({ ...loadingObj, form: true })
		try {
			const api = currentMenuId == null ? API.sys.sysMenuControllerSave : API.sys.sysMenuControllerEdit
			await api({ ...values, menuId: form?.menuId })
			props.onRefresh?.()
			window.$message.success(currentMenuId == null ? "新增成功" : "编辑成功")
			setOpen(false)
		} catch (error) {
			console.error("|新增或修改菜单|意外的错误,error:", error)
			setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
			return false
		}
		setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
		return true
	}

	// 查询菜单详情（根据传入的 id），避免依赖尚未更新的 state
	const getDetail = async (id: number | null) => {
		if (id === null) return
		try {
			const { data } = await API.sys.sysMenuControllerGetByMenuId(id)
			setForm(data)
		} catch (error) {
			console.error("|查询菜单详情|意外的错误,error:", error)
		}
	}

	useImperativeHandle(ref, () => {
		return {
			open: async (id: number | null) => {
				setLoadingObj({ ...loadingObj, modal: true })
				setCurrentMenuId(id)
				setOpen(true)
				console.log("id:", id)
				try {
					if (id == null) {
						setForm(null)
						return
					}
					await getDetail(id)
				} catch (error) {
					console.error(error)
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
			title={currentMenuId === null ? "新增菜单" : "编辑菜单"}
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

export default MenuForm
