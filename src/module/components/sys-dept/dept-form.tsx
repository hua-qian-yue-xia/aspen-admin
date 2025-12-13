import { BetaSchemaForm, ProFormInstance } from "@ant-design/pro-components"
import type { ProFormColumnsType } from "@ant-design/pro-components"

import { API } from "@@/api/share/request-tool"
import type { SysDeptEntity } from "@@/api/gen/gen-api"

import CMP from "@@/components"

export type DeptFormCmpRef = {
	open: (deptParentId: string, id: string | null) => Promise<void>
}

type Props = {
	onRefresh?: () => void
}

const columns: Array<ProFormColumnsType<SysDeptEntity>> = [
	{
		valueType: "dependency",
		name: ["isCatalogueDpet"],
		columns: (values) => {
			const isCatalogueDpet = values?.isCatalogueDpet ?? false
			return [
				{
					dataIndex: "deptParentId",
					title: "父部门",
					tooltip: "如果不选择,则默认为顶级部门",
					fieldProps: {
						disabled: isCatalogueDpet,
					},
					renderFormItem: () => {
						return <CMP.sysDept.DeptTreeSelect />
					},
				},
				{
					dataIndex: "deptName",
					title: "部门名称",
					fieldProps: {
						disabled: isCatalogueDpet,
					},
					formItemProps: {
						rules: [{ required: true, message: "请输入部门名" }],
					},
				},
				{
					dataIndex: "sort",
					title: "排序",
					tooltip: "越大越在前",
					fieldProps: {
						disabled: isCatalogueDpet,
					},
					formItemProps: {},
				},
			]
		},
	},
]

const DeptFormCmp = forwardRef<DeptFormCmpRef, Props>(({ onRefresh }, ref) => {
	const formRef = useRef<ProFormInstance>()

	const [open, setOpen] = useState(false)
	const [form, setForm] = useState<SysDeptEntity>(null)
	const [loadingObj, setLoadingObj] = useState({
		form: false,
		modal: false,
	})

	const [deptId, setDeptId] = useState<string | null>(null)
	const [deptParentId, setDeptParentId] = useState<string | null>(null)

	// 新增或修改部门
	const onFinish = async (values: any) => {
		setLoadingObj({ ...loadingObj, form: true })
		try {
			const api = deptId === null ? API.sys.sysDeptControllerSave : API.sys.sysDeptControllerEdit
			await api({ ...values, deptId })
			onRefresh?.()
			window.$message.success(deptId === null ? "新增成功" : "编辑成功")
			setOpen(false)
		} catch (error) {
			console.error("|新增或修改部门|意外的错误,error:", error)
			setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
			return false
		}
		setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
		return true
	}

	// 查询字典详情
	const getDetail = async (id: string | null) => {
		if (id === null) return
		try {
			const { data } = await API.sys.sysDeptControllerGetByDeptId(id)
			if (data.deptParentId === "-99") {
				data.deptParentId = null
			}
			setForm({ ...data } as any)
			console.log("data:", data)
			formRef.current?.setFieldsValue(data)
		} catch (error) {
			console.error("|查询部门详情|意外的错误,error:", error)
		}
	}

	useImperativeHandle(ref, () => ({
		open: async (deptParentId: string, id: string | null) => {
			setLoadingObj({ ...loadingObj, modal: true })
			setDeptParentId(deptParentId)
			setDeptId(id)
			setOpen(true)
			try {
				if (!id) {
					setForm({ deptParentId: deptParentId === "-99" ? null : deptParentId } as SysDeptEntity)
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
			key={deptId ?? "dictKey"}
			initialValues={form}
			formRef={formRef}
			loading={loadingObj.form}
			title={deptId === null ? "新增部门" : "编辑部门"}
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

export default DeptFormCmp
