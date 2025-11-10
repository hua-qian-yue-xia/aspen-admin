import { BetaSchemaForm, ProFormInstance } from "@ant-design/pro-components"
import { ProFormColumnsType } from "@ant-design/pro-components"

import { API } from "@@/api/share/request-tool"
import type { FrameDictSaveDto, FrameDictEntity } from "@@/api/gen/gen-api"

export type DictValueFormRef = {
	open: (id: string | null) => Promise<void>
}

type Props = {
	onRefresh?: () => void
}

const columns: Array<ProFormColumnsType<FrameDictEntity>> = [
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

const DictKeyFormCmp = forwardRef<DictValueFormRef, Props>(({ onRefresh }, ref) => {
	const formRef = useRef<ProFormInstance>()

	const [open, setOpen] = useState(false)
	const [form, setForm] = useState<FrameDictSaveDto | null>(null)
	const [loadingObj, setLoadingObj] = useState({
		form: false,
		modal: false,
	})

	const [dictItemId, setDictItemId] = useState<string | null>(null)

	// 新增或修改字典
	const onFinish = async (values: any) => {
		setLoadingObj({ ...loadingObj, form: true })
		try {
			const api = dictItemId === null ? API.frame.frameDictControllerSave : API.frame.frameDictControllerEdit
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

	// 查询字典详情
	const getDetail = async (id: string | null) => {
		if (id === null) return
		try {
			const { data } = await API.frame.frameDictControllerGetByDictId(id)
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
			key={dictItemId ?? "dictKey"}
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

export default memo(DictKeyFormCmp)
