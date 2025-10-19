import type { ProFormColumnsType, ProFormInstance } from "@ant-design/pro-components"
import { BetaSchemaForm } from "@ant-design/pro-components"

import { API } from "@@/api/share/request-tool"
import type { SysUserEditDto } from "@@/api/gen/gen-api"

import CONSTANT from "@@/constant"

export type UserFormRef = {
	open: (id: number | null) => Promise<void>
}

type Props = {
	onRefresh?: () => void
}

const UserForm = forwardRef<UserFormRef, Props>(({ onRefresh }, ref) => {
	const formRef = useRef<ProFormInstance>()

	const [open, setOpen] = useState(false)
	const [form, setForm] = useState<SysUserEditDto | null>(null)
	const [loadingObj, setLoadingObj] = useState({
		form: false,
		modal: false,
	})

	const [currentUserId, setCurrentUserId] = useState<number | null>(null)

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
	]

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

	// 查询用户详情（根据传入的 id），避免依赖尚未更新的 state
	const getDetail = async (id: number | null) => {
		if (id === null) return
		try {
			const { data } = await API.sys.sysUserControllerGetByUserId(id)
			setForm(data)
		} catch (error) {
			console.error("|查询用户详情|意外的错误,error:", error)
		}
	}

	useImperativeHandle(ref, () => ({
		open: async (id: number | null) => {
			setLoadingObj({ ...loadingObj, modal: true })
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
				setOpen(true)
				setTimeout(() => setLoadingObj({ ...loadingObj, modal: false }), 500)
			}
		},
	}))

	return (
		<BetaSchemaForm
			key={form?.userId ?? "create_user"}
			initialValues={form}
			formRef={formRef}
			loading={loadingObj.form}
			title={form?.userId === null ? "新增用户" : "编辑用户"}
			open={open}
			columns={columns}
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

export default UserForm
