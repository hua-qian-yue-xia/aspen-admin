import { BetaSchemaForm, ProFormInstance } from "@ant-design/pro-components"
import { ProFormColumnsType } from "@ant-design/pro-components"

import { API } from "@@/api/share/request-tool"
import type { FrameDictItemSaveDto, FrameDictItemEntity } from "@@/api/gen/gen-api"

export type DictKeyFormRef = {
	open: (id: string | null) => Promise<void>
}

type Props = {
	onRefresh?: () => void
}

const columns: Array<ProFormColumnsType<FrameDictItemEntity>> = [
	{
		dataIndex: "summary",
		title: "字典名称",
		formItemProps: {
			rules: [{ required: true, message: "请输入字典名称" }],
		},
	},
	{
		dataIndex: "code",
		title: "字典值",
		formItemProps: {
			rules: [{ required: true, message: "请输入字典值" }],
		},
	},
]

const DictValueFormCmp = forwardRef<DictKeyFormRef, Props>(({ onRefresh }, ref) => {
	const formRef = useRef<ProFormInstance>()

	const [open, setOpen] = useState(false)
	const [form, setForm] = useState<FrameDictItemSaveDto | null>(null)
	const [loadingObj, setLoadingObj] = useState({
		form: false,
		modal: false,
	})

	const [dictItemId, setDictItemId] = useState<string | null>(null)

	// 新增或修改字典项
	const onFinish = async (values: any) => {
		setLoadingObj({ ...loadingObj, form: true })
		try {
			const api = dictItemId === null ? API.frame.frameDictItemControllerSave : API.frame.frameDictItemControllerEdit
			await api({ ...values, dictItemId })
			onRefresh?.()
			window.$message.success(dictItemId === null ? "新增成功" : "编辑成功")
			setOpen(false)
		} catch (error) {
			console.error("|新增或修改字典项|意外的错误,error:", error)
			setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
			return false
		}
		setTimeout(() => setLoadingObj({ ...loadingObj, form: false }), 500)
		return true
	}

	// 查询字典项详情
	const getDetail = async (id: string | null) => {
		if (id === null) return
		try {
			const { data } = await API.frame.frameDictItemControllerGetByDictItemId(id)
			setForm(data)
		} catch (error) {
			console.error("|查询字典值详情|意外的错误,error:", error)
		}
	}

	useImperativeHandle(ref, () => ({
		open: async (id: string | null) => {
			setLoadingObj({ ...loadingObj, modal: true })
			setDictItemId(id)
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
			key={dictItemId ?? "dictItem"}
			initialValues={form}
			formRef={formRef}
			loading={loadingObj.form}
			title={dictItemId === null ? "新增字典" : "编辑字典"}
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

export default DictValueFormCmp
