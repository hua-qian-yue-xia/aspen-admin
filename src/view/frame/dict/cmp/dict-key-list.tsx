import { Button, Flex, Typography, Input, Empty } from "antd"
import { DeleteOutlined, ExportOutlined, FormOutlined, SearchOutlined } from "@ant-design/icons"
import { useSetState, useRequest } from "ahooks"

import { mergeClass } from "@aspen/common"

import { API } from "@@/api/share/request-tool"
import type { FrameDictEntity, FrameDictQueryDto } from "@/module/api/gen/gen-api"

import DictKeyFormCmp from "./dict-key-form"
import { DictKeyFormRef } from "./dict-value-form"
import BaseSvgIcon from "~/packages/crud/src/module/base/base-svg-icon"

const { Text, Title } = Typography

type Props = {
	onActive?: (dictId: string | null) => void
}

const DictKeyListCmp: React.FC<Props> = ({ onActive }) => {
	const dictKeyFormRef = useRef<DictKeyFormRef>(null)

	const [searchParams, setSearchParams] = useSetState<FrameDictQueryDto>({})
	const [activeDictId, setActiveDictId] = useState(null)
	const [dictKeyList, setDictKeyList] = useState<Array<FrameDictEntity>>([])
	const [total, setTotal] = useState(0)

	useEffect(() => {
		getDictPage()
	}, [])

	// 查询字典键分页列表
	const { run: getDictPage } = useRequest(
		async () => {
			try {
				const _params: any = {
					pageNum: 1,
					pageSize: 999,
					...searchParams,
				}
				const { data } = await API.frame.frameDictControllerPage(_params)
				setDictKeyList(data?.records ?? [])
				setTotal(data?.totalRecord ?? 0)
				if (!activeDictId) {
					const firstDictId = data?.records?.[0]?.id || null
					setActiveDictId(firstDictId)
					onActive?.(firstDictId)
				}
			} catch (error) {
				console.error("|查询字典键分页列表|意外的错误,error:", error)
			}
		},
		{ debounceWait: 500, manual: true },
	)

	// 删除字典
	const deleteDictKey = async (v: FrameDictEntity) => {
		try {
			await API.frame.frameDictControllerDelete([v.id])
			getDictPage()
		} catch (error) {
			console.error("|删除字典键|意外的错误,error:", error)
		}
	}

	return (
		<Flex vertical className="full">
			<Title level={5}>字典键管理</Title>
			<Flex align="center" justify="space-between" className="p-x-2 p-y-2 m-b-2 gap-2">
				<Input
					allowClear
					placeholder="搜索字典名称/值"
					value={searchParams.quick}
					prefix={<SearchOutlined />}
					onChange={(e) => {
						setSearchParams({ quick: e.target.value })
						getDictPage()
					}}
					className="flex-1"
				/>
				<Button
					type="primary"
					color="primary"
					size="middle"
					icon={<BaseSvgIcon icon="mingcute:add-fill" />}
					onClick={() => dictKeyFormRef.current?.open(null)}
				>
					新增字典
				</Button>
			</Flex>
			<Flex vertical flex={1}>
				{total == 0 ? (
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				) : (
					dictKeyList.map((v) => (
						<Flex
							key={v.id}
							align="center"
							justify="space-between"
							className={mergeClass(
								"p-x-4 p-y-1 m-b-2 rounded-2 cursor-pointer transition-colors duration-200 hover:bg-primary/10",
								activeDictId === v.id ? "bg-primary/10" : "",
							)}
							onClick={() => {
								setActiveDictId(v.id)
								onActive?.(v.id)
							}}
						>
							<Flex align="center" justify="center">
								<div className="flex flex-col">
									<Text strong className="color-primary!">
										{v.summary}
									</Text>
									<Text className="opacity-70 text-sm">{v.code}</Text>
								</div>
							</Flex>
							<Flex align="center" justify="center">
								<Button
									size="small"
									variant="text"
									color="primary"
									icon={<FormOutlined />}
									onClick={(e) => {
										e.stopPropagation()
										dictKeyFormRef.current?.open(v.id)
									}}
								>
									编辑
								</Button>
								<Button
									size="small"
									variant="text"
									color="danger"
									icon={<DeleteOutlined />}
									onClick={(e) => {
										e.stopPropagation()
										deleteDictKey(v)
									}}
								>
									删除
								</Button>
							</Flex>
						</Flex>
					))
				)}
			</Flex>
			<Button className="w-full" type="primary" size="middle" icon={<ExportOutlined />}>
				导出
			</Button>
			<DictKeyFormCmp ref={dictKeyFormRef} onRefresh={getDictPage} />
		</Flex>
	)
}

export default memo(DictKeyListCmp)
