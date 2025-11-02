import { Button, Splitter } from "antd"
import type { ActionType, ProColumns } from "@ant-design/pro-components"

import { CrudTable, CrudTableOperation } from "@aspen/crud"

import { API } from "@@/api/share/request-tool"
import type { FrameDictItemEntity } from "@@/api/gen/gen-api"

import DictKeyManageCmp from "./cmp/dict-key-manage"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"

const DictPage: React.FC = () => {
	const actionRef = useRef<ActionType>(null)

	const [loadingObj, setLoadingObj] = useState({ table: false })
	const [queryForm, setQueryForm] = useState({
		dictId: "",
	})

	const columns: Array<ProColumns<FrameDictItemEntity>> = [
		{
			title: "排序",
			key: "sort",
			dataIndex: ["sort"],
		},
		{
			title: "字典名称",
			dataIndex: ["summary"],
		},
		{
			title: "字典值",
			dataIndex: ["code"],
		},
		{
			title: "颜色",
			dataIndex: ["hexColor"],
		},
		{
			title: "操作",
			width: 120,
			align: "center",
			dataIndex: "operation",
			render: (dom, entity) => {
				return (
					<div className="flex gap-1">
						<Button variant="text" color="primary" icon={<FormOutlined />}>
							编辑
						</Button>
						<Button variant="text" color="danger" icon={<DeleteOutlined />} onClick={() => deleteDictItem(entity)}>
							删除
						</Button>
					</div>
				)
			},
		},
	]

	// 获取字典项列表
	const getList = async (page: number = 1, pageSize: number = 10) => {
		try {
			setLoadingObj({ table: true })
			const _params: any = {
				page: page,
				pageSize: pageSize,
				dictId: queryForm.dictId,
			}
			const { data } = await API.frame.frameDictItemControllerPage(_params)
			return {
				data: data.records || [],
				success: true,
				total: data.totalRecord || 0,
			}
		} catch (error) {
			console.error("|获取字典项列表|意外的错误,error:", error)
		} finally {
			setTimeout(() => setLoadingObj({ table: false }), 500)
		}
	}

	// 删除字典项
	const deleteDictItem = async (entity: FrameDictItemEntity) => {
		window.$modal.confirm({
			title: "警告",
			content: `字典项:${entity.menuName}(${entity.path})确认删除吗?`,
			onOk: async () => {
				// 判断是否有子菜单
				await API.frame.frameDictItemControllerDictItemDelete([String(entity.id)])
				actionRef.current?.reload()
				window.$message.success("删除成功")
			},
		})
	}

	return (
		<Splitter className="full">
			<Splitter.Panel defaultSize="30%" min="30%" max="40%">
				<DictKeyManageCmp
					onActive={(dictId) => {
						if (!dictId || dictId === queryForm.dictId) return
						setQueryForm({ dictId })
						actionRef.current?.reload()
					}}
				/>
			</Splitter.Panel>
			<Splitter.Panel>
				<CrudTable
					actionRef={actionRef}
					rowKey="id"
					headerTitle="字典项"
					columns={columns}
					search={false}
					loading={loadingObj.table}
					request={({ current, pageSize }) => {
						return getList(current, pageSize)
					}}
					toolBarRender={() => [<CrudTableOperation visibleImport={false} />]}
				/>
			</Splitter.Panel>
		</Splitter>
	)
}

export default DictPage
