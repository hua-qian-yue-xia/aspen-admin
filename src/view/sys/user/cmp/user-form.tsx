import type { ProFormColumnsType, ProFormInstance } from "@ant-design/pro-components"
import { BetaSchemaForm } from "@ant-design/pro-components"

import { API } from "@@/api/share/request-tool"
import type { SysUserSaveDto } from "@@/api/gen/gen-api"

import CMP from "@@/components"

import CONSTANT from "@@/constant"

export type UserFormRef = {
	open: (id: string | null) => Promise<void>
}

type Props = {
	onRefresh?: () => void
}

const columns: Array<ProFormColumnsType> = [
	{
		dataIndex: "username",
		title: "用户名",
		formItemProps: {
			rules: [
				{ required: true, message: "请输入用户名" },
				{ pattern: CONSTANT.reg.REG_USER_NAME, message: "请输入2-16位数字、字母、下划线或中划线" },
			],
		},
	},
	{
		dataIndex: "userNickname",
		title: "用户昵称",
		formItemProps: {
			rules: [
				{ required: true, message: "请输入用户昵称" },
				{ pattern: CONSTANT.reg.REG_NICK_NAME, message: "请输入2-16位数字、字母或中划线" },
			],
		},
	},
	{
		dataIndex: "mobile",
		title: "用户手机号",
		formItemProps: {
			rules: [
				{ required: true, message: "请输入用户手机号" },
				{ pattern: CONSTANT.reg.REG_PHONE, message: "请输入正确的手机号" },
			],
		},
	},
	{
		dataIndex: "deptIdList",
		name: "deptIdList",
		title: "部门",
		formItemProps: {
			rules: [{ required: true, message: "请选择部门" }],
		},
		renderFormItem: () => {
			console.log("|部门选择|")

			return <CMP.sysDept.DeptTreeSelect />
		},
		transform: (value: string | Array<string>) => {
			return {
				deptIdList: Array.isArray(value) ? value : [value],
			}
		},
	},
	{
		dataIndex: "roleIdList",
		title: "角色",
		formItemProps: {
			rules: [{ required: true, message: "请选择角色" }],
		},
		renderFormItem: () => {
			return <CMP.sysRole.RoleSelect mode="multiple" />
		},
	},
]

const UserFormCmp = forwardRef<UserFormRef, Props>(({ onRefresh }, ref) => {
	const formRef = useRef<ProFormInstance>()

	const [open, setOpen] = useState(false)
	const [form, setForm] = useState<SysUserSaveDto | null>(null)
	const [loadingObj, setLoadingObj] = useState({
		form: false,
		modal: false,
	})

	const [currentUserId, setCurrentUserId] = useState<string | null>(null)

	// 新增或修改用户
	const onFinish = async (values: any) => {
		setLoadingObj({ ...loadingObj, form: true })
		try {
			const api = currentUserId === null ? API.sys.sysUserControllerSave : API.sys.sysUserControllerEdit
			await api({ ...values, userId: form?.userId })
			onRefresh?.()
			window.$message.success(currentUserId === null ? "新增成功" : "编辑成功")
			setOpen(false)
		} catch (error) {
			console.error("|新增或修改用户|意外的错误,error:", error)
			setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
			return false
		}
		setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
		return true
	}

	// 查询用户详情
	const getDetail = async (id: string | null) => {
		if (id === null) return
		try {
			const { data } = await API.sys.sysUserControllerGetByUserId(id)
			const form = {
				...data,
				roleIdList: data.userRoles.map((v) => v.roleId),
				deptIdList: data.userDepts.map((v) => v.deptId),
			} as SysUserSaveDto
			setForm(form)
			formRef.current?.setFieldsValue(form)
		} catch (error) {
			console.error("|查询用户详情|意外的错误,error:", error)
		}
	}

	useImperativeHandle(ref, () => ({
		open: async (id: string | null) => {
			setLoadingObj({ ...loadingObj, modal: true })
			setOpen(true)
			setCurrentUserId(id)
			try {
				if (id === null) {
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
			grid
			initialValues={form}
			formRef={formRef}
			loading={loadingObj.form}
			title={form?.userId === null ? "新增用户" : "编辑用户"}
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

export default UserFormCmp
