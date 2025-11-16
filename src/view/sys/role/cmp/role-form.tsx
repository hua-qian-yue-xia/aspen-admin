import { BetaSchemaForm, ProFormInstance } from "@ant-design/pro-components"
import type { ProFormColumnsType } from "@ant-design/pro-components"

import { API } from "@@/api/share/request-tool"
import type { SysRoleEntity, SysRoleSaveDto } from "@@/api/gen/gen-api"

export type RoleFormCmpRef = {
	open: (id: string | null) => Promise<void>
}

type Props = {
	onRefresh?: () => void
}

const columns: Array<ProFormColumnsType<SysRoleEntity>> = [
	{
		dataIndex: "parentRoleId",
		title: "父角色",
		formItemProps: {},
	},
	{
		dataIndex: "roleName",
		title: "角色名",
		formItemProps: {
			rules: [{ required: true, message: "请输入角色名" }],
		},
	},
	{
		dataIndex: "roleCode",
		title: "角色编码",
		formItemProps: {
			rules: [{ required: true, message: "请输入角色编码" }],
		},
	},
	{
		dataIndex: "sort",
		title: "排序",
		tooltip: "越大越在前",
		formItemProps: {},
	},
]

const RoleFormCmp = forwardRef<RoleFormCmpRef, Props>(({ onRefresh }, ref) => {
	const formRef = useRef<ProFormInstance>()

	const [open, setOpen] = useState(false)
	const [form, setForm] = useState<SysRoleSaveDto>(null)
	const [roleId, setRoleId] = useState<string | null>(null)
	const [loadingObj, setLoadingObj] = useState({
		form: false,
		modal: false,
	})

	// 新增或修改角色
	const onFinish = async (values: any) => {
		setLoadingObj({ ...loadingObj, form: true })
		try {
			const api = roleId === null ? API.sys.sysRoleControllerSave : API.sys.sysRoleControllerEdit
			await api({ ...values, roleId })
			onRefresh?.()
			window.$message.success(roleId === null ? "新增成功" : "编辑成功")
			setOpen(false)
		} catch (error) {
			console.error("|新增或修改角色|意外的错误,error:", error)
			setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
			return false
		}
		setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
		return true
	}

	// 查询角色详情
	const getDetail = async (id: string | null) => {
		if (id === null) return
		try {
			const { data } = await API.sys.sysRoleControllerGetByRoleId(id)
			setForm({ ...data } as any)
		} catch (error) {
			console.error("|查询角色详情|意外的错误,error:", error)
		}
	}

	useImperativeHandle(ref, () => ({
		open: async (id: string | null) => {
			setLoadingObj({ ...loadingObj, modal: true })
			setRoleId(id)
			setOpen(true)
			try {
				if (!id) {
					setForm(null)
					formRef.current?.resetFields()
					return
				}
				await getDetail(id)
			} catch (error) {
				console.log(error)
			} finally {
				setTimeout(() => setLoadingObj({ ...loadingObj, modal: false }), 500)
			}
		},
	}))

	return (
		<BetaSchemaForm
			key={roleId ?? "roleId"}
			initialValues={form}
			formRef={formRef}
			loading={loadingObj.form}
			title={roleId === null ? "新增角色" : "编辑角色"}
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

export default RoleFormCmp
