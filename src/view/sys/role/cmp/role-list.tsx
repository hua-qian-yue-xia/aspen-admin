import { Button, Flex, Input, Typography } from "antd"
import { MoreOutlined, SearchOutlined, TagOutlined } from "@ant-design/icons"

import { mergeClass } from "@aspen/common"
import BaseSvgIcon from "~/packages/crud/src/module/base/base-svg-icon"

import { API } from "@@/api/share/request-tool"
import type { SysRoleEntity } from "@/module/api/gen/gen-api"

import type { RoleFormCmpRef } from "./role-form"

const RoleFormCmp = lazy(() => import("./role-form"))

const { Text, Title } = Typography

type Props = {
	onActive?: (dictId: string | null) => void
}

const RoleListCmp: React.FC<Props> = ({ onActive }) => {
	const roleFormRef = useRef<RoleFormCmpRef>(null)

	const [searchText, setSearchText] = useState("")
	const [activeRoleId, setActiveRoleId] = useState(null)
	const [roleList, setRoleList] = useState<Array<SysRoleEntity>>([])

	useEffect(() => {
		getRolePage()
	}, [])

	// 查询角色分页
	const getRolePage = async () => {
		try {
			const _params: any = {
				pageNum: 1,
				pageSize: 10,
			}
			const { data } = await API.sys.sysRoleControllerPage(_params)
			setRoleList(data?.records || [])
			if (!activeRoleId) {
				const firstDictId = data?.records?.[0]?.id || null
				setActiveRoleId(firstDictId)
				onActive?.(firstDictId)
			}
		} catch (error) {
			console.error("|查询角色分页|意外的错误,error:", error)
		}
	}

	return (
		<div className="full">
			<Title level={5}>角色管理</Title>
			<Flex align="center" justify="space-between" className="p-x-2 p-y-2 m-b-2 gap-2">
				<Input
					allowClear
					placeholder="搜索角色名称/编码"
					value={searchText}
					prefix={<SearchOutlined />}
					onChange={(e) => setSearchText(e.target.value)}
					className="flex-1"
				/>
				<Button
					type="primary"
					color="primary"
					size="middle"
					icon={<BaseSvgIcon icon="mingcute:add-fill" />}
					onClick={() => roleFormRef.current?.open(null)}
				/>
			</Flex>
			{roleList.map((v) => {
				return (
					<Flex
						key={v.id}
						align="center"
						justify="space-between"
						className={mergeClass(
							"p-x-4 p-y-2 m-b-2 rounded-2 cursor-pointer transition-colors duration-200 hover:bg-primary/10",
							activeRoleId === v.roleId ? "bg-primary/10" : "",
						)}
						onClick={() => {
							setActiveRoleId(v.roleId)
							onActive?.(v.roleId)
						}}
					>
						<Flex className="w-full" align="center" justify="center">
							<TagOutlined />
							<Flex className="m-l-2" align="center" justify="flex-start" gap={4} flex={1}>
								<Text strong className="color-primary! text-14px">
									{v.roleName}
								</Text>
								<Text className="opacity-70 text-12px">{v.roleCode}</Text>
							</Flex>
							<MoreOutlined />
						</Flex>
					</Flex>
				)
			})}
			<RoleFormCmp ref={roleFormRef} onRefresh={getRolePage} />
		</div>
	)
}

export default memo(RoleListCmp)
