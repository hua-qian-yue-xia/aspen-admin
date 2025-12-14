import { Button, Card, Flex, Tag } from "antd"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"
import type { ActionType, ProColumns } from "@ant-design/pro-components"

import { CrudTable, CrudTableOperation } from "@aspen/crud"

import { API } from "@@/api/share/request-tool"
import type { FrameDictItemEntity, FrameDictItemQueryDto } from "@@/api/gen/gen-api"

import DictKeyListCmp from "./cmp/dict-key-list"
import DictValueFormCmp from "./cmp/dict-value-form"
import type { DictKeyFormRef } from "./cmp/dict-value-form"

const DictPage: React.FC = () => {
	const actionRef = useRef<ActionType>(null)
	const dictValueFormRef = useRef<DictKeyFormRef>(null)

	const [loadingObj, setLoadingObj] = useState({ table: false })
	const [queryForm, setQueryForm] = useState({
		dictId: "",
	})

	const columns: Array<ProColumns<FrameDictItemEntity>> = [
		{
			title: "聚合查询",
			dataIndex: ["quick"],
			fieldProps: {
				placeholder: "请输入菜单名、路由地址",
			},
			hideInTable: true,
		},
		{
			title: "排序",
			key: "sort",
			dataIndex: ["sort"],
			hideInSearch: true,
		},
		{
			title: "字典名称",
			dataIndex: ["summary"],
			hideInSearch: true,
			render: (dom, entity) => {
				return <Tag color={entity.hexColor}>{entity.summary}</Tag>
			},
		},
		{
			title: "字典值",
			dataIndex: ["code"],
			hideInSearch: true,
		},
		{
			title: "操作",
			width: 120,
			align: "center",
			valueType: "option",
			render: (dom, entity) => {
				return (
					<div className="flex gap-1">
						<Button
							variant="text"
							color="primary"
							icon={<FormOutlined />}
							onClick={() => dictValueFormRef.current?.open(entity.id)}
						>
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
	const getList = async (page: number = 1, pageSize: number = 10, params: FrameDictItemQueryDto) => {
		try {
			setLoadingObj({ table: true })
			const _params: any = {
				...params,
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
		<Flex className="full">
			<Card className="w-25% h-full mr-3" styles={{ body: { height: "100%" } }}>
				<DictKeyListCmp
					onActive={(dictId) => {
						if (!dictId || dictId === queryForm.dictId) return
						setQueryForm({ dictId })
						actionRef.current?.reload()
					}}
				/>
			</Card>
			<Card className="flex-1 h-full">
				<CrudTable
					actionRef={actionRef}
					rowKey="id"
					headerTitle="字典项"
					columns={columns}
					search={{
						className: "p-x-0! p-y-2!",
					}}
					loading={loadingObj.table}
					request={({ current, pageSize, ...rest }) => {
						return getList(current, pageSize, rest)
					}}
					toolBarRender={() => [
						<CrudTableOperation visibleImport={false} onAdd={() => dictValueFormRef.current?.open(null)} />,
					]}
				/>
			</Card>
			<DictValueFormCmp ref={dictValueFormRef} onRefresh={() => actionRef.current?.reload()} />
		</Flex>
	)
}

export default DictPage
