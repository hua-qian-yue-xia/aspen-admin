import { BetaSchemaForm, ProFormInstance } from "@ant-design/pro-components"
import type { ProFormColumnsType } from "@ant-design/pro-components"

import CMP from "@@/components"

import { API } from "@@/api/share/request-tool"
import type { SysRoleEntity } from "@@/api/gen/gen-api"

export type RoleFormCmpRef = {
	open: (roleParentId: string, id: string | null) => Promise<void>
}

type Props = {
	onRefresh?: () => void
}

const notExistRootRoleId = "-99"

const columns: Array<ProFormColumnsType<SysRoleEntity>> = [
	{
		valueType: "dependency",
		name: ["isCatalogueRole"],
		columns: (values) => {
			const isCatalogueRole = values?.isCatalogueRole ?? false
			return [
				{
					dataIndex: "parentRoleId",
					title: "父角色",
					formItemProps: {},
					fieldProps: {
						disabled: isCatalogueRole,
					},
					renderFormItem: () => {
						return <CMP.tree.roleSelect selectTypes={["catalogue"]} />
					},
				},
				{
					dataIndex: "roleName",
					title: "角色名",
					fieldProps: {
						disabled: isCatalogueRole,
					},
					formItemProps: {
						rules: [{ required: true, message: "请输入角色名" }],
					},
				},
				{
					dataIndex: "roleCode",
					title: "角色编码",
					fieldProps: {
						disabled: isCatalogueRole,
					},
					formItemProps: {
						rules: [{ required: true, message: "请输入角色编码" }],
					},
				},
				{
					dataIndex: "roleType",
					fieldProps: {
						disabled: isCatalogueRole,
					},
					title: "类型",
					renderFormItem: () => {
						return <CMP.dict.select dictType="sys_role_type" autoSelectFirst placeholder="请选择类型" />
					},
				},
				{
					dataIndex: "sort",
					title: "排序",
					tooltip: "越大越在前",
					formItemProps: {},
				},
			]
		},
	},
]

const RoleFormCmp = forwardRef<RoleFormCmpRef, Props>(({ onRefresh }, ref) => {
	const formRef = useRef<ProFormInstance>()

	const [open, setOpen] = useState(false)
	const [form, setForm] = useState<SysRoleEntity>(null)
	const [roleId, setRoleId] = useState<string | null>(null)
	const [roleParentId, setRoleParentId] = useState<string | null>(null)
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
			if (data.parentRoleId == notExistRootRoleId) {
				data.parentRoleId = null
			}
			setForm({ ...data } as any)
			formRef.current?.setFieldsValue(data)
		} catch (error) {
			console.error("|查询角色详情|意外的错误,error:", error)
		}
	}

	useImperativeHandle(ref, () => ({
		open: async (roleParentId: string, id: string | null) => {
			setLoadingObj({ ...loadingObj, modal: true })
			setRoleParentId(roleParentId)
			setRoleId(id)
			setOpen(true)
			try {
				if (!id) {
					setForm({ parentRoleId: roleParentId === notExistRootRoleId ? null : roleParentId } as any)
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
