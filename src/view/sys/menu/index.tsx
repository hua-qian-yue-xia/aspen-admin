import { Card, Divider, Flex } from "antd"

import CMP from "@@/components"

import MenuTableCmp from "./cmp/menu-table"

const MenuPage: React.FC = () => (
	<Card className="full" styles={{ body: { height: "100%" } }}>
		<Flex className="full flex">
			<Flex className="min-w-65 w-20% h-full">
				<CMP.sysMenu.MenuTree title="" visibleExport={false} treeCheckable />
			</Flex>
			<Divider className="h-full" orientation="vertical" />
			<Flex vertical className="flex-1 h-full p-x-2">
				<MenuTableCmp />
			</Flex>
		</Flex>
	</Card>
)

export default MenuPage
