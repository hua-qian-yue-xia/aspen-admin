import { Card, Divider, Flex, Tabs } from "antd"
import type { TabsProps } from "antd"

import RoleListCmp from "./cmp/role-list"
import RoleSettingCmp from "./cmp/role-setting"
import RoleUserListCmp from "./cmp/role-user-list"

const TabItems: TabsProps["items"] = [
	{
		key: "ROLE",
		label: "权限",
	},
	{
		key: "USER",
		label: "用户",
	},
]

const RolePage: React.FC = () => {
	const [activeTab, setActiveTab] = useState(TabItems[0].key)

	const tabChange = (key: string) => {
		setActiveTab(key)
	}

	return (
		<Card className="full" styles={{ body: { height: "100%" } }}>
			<Flex className="full flex">
				<Flex className="min-w-65 w-15% h-full">
					<RoleListCmp />
				</Flex>
				<Divider className="h-full" orientation="vertical" />
				<Flex vertical className="flex-1 h-full p-x-2">
					<Tabs defaultActiveKey={TabItems[0].key} items={TabItems} onChange={tabChange} />
					{activeTab === "ROLE" && <RoleSettingCmp />}
					{activeTab === "USER" && <RoleUserListCmp />}
				</Flex>
			</Flex>
		</Card>
	)
}

export default RolePage
