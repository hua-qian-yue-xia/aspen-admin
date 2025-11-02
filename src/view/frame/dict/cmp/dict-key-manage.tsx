import { useEffect } from "react"
import { Button, Flex, Typography } from "antd"

import { mergeClass } from "@aspen/common"

import { API } from "@@/api/share/request-tool"
import type { FrameDictEntity } from "@/module/api/gen/gen-api"
import { DeleteOutlined, FormOutlined } from "@ant-design/icons"

const { Text } = Typography

type Props = {
	onActive?: (dictId: string | null) => void
}

const DictKeyManageCmp: React.FC<Props> = ({ onActive }) => {
	const [activeDictId, setActiveDictId] = useState(null)
	const [dictKeyList, setDictKeyList] = useState<Array<FrameDictEntity>>([])

	useEffect(() => {
		getDictPage()
	}, [])

	// 查询字典键分页列表
	const getDictPage = async () => {
		try {
			const { data } = await API.frame.frameDictControllerPage({
				pageNum: 1,
				pageSize: 10,
			} as any)
			setDictKeyList(data?.records || [])
			if (!activeDictId) {
				const firstDictId = data?.records?.[0]?.id || null
				setActiveDictId(firstDictId)
				onActive?.(firstDictId)
			}
		} catch (error) {
			console.error("|查询字典键分页列表|意外的错误,error:", error)
		}
	}

	// 删除字典键
	const deleteDictKey = async (v: FrameDictEntity) => {
		try {
			await API.frame.frameDictControllerDelete([v.dictKeyId])
			getDictPage()
		} catch (error) {
			console.error("|删除字典键|意外的错误,error:", error)
		}
	}

	return (
		<div className="full">
			<h2>字典键管理</h2>
			{dictKeyList.map((v) => (
				<Flex
					key={v.code}
					align="center"
					justify="space-between"
					className={mergeClass(
						"p-x-2 p-y-2 m-b-2 rounded cursor-pointer transition-colors duration-200",
						activeDictId === v.id ? "bg-primary/15" : "",
					)}
					onClick={() => {
						setActiveDictId(v.id)
						onActive?.(v.id)
					}}
				>
					<Flex align="center" justify="center">
						<Text strong className="color-primary!">
							{v.summary}
						</Text>
					</Flex>
					<Flex align="center" justify="center">
						<Button size="small" variant="text" color="primary" icon={<FormOutlined />}>
							编辑
						</Button>
						<Button
							size="small"
							variant="text"
							color="danger"
							icon={<DeleteOutlined />}
							onClick={() => deleteDictKey(v)}
						>
							删除
						</Button>
					</Flex>
				</Flex>
			))}
		</div>
	)
}

export default DictKeyManageCmp
