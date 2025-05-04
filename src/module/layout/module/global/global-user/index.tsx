import { Dropdown } from "antd"
import type { MenuProps } from "antd"

import ButtonIcon from "@/module/components/custom/button-icon"
import SvgIcon from "@/module/components/custom/svg-icon"

const GlobalUser: React.FC = memo(() => {
	const items: MenuProps["items"] = [
		{
			key: "0",
			label: (
				<div className="flex-row-center gap-8px">
					<SvgIcon className="text-icon-large" icon="ph:user-circle" />
					<span>个人中心</span>
				</div>
			),
		},
		{
			type: "divider",
		},
		{
			key: "1",
			label: (
				<div className="flex-row-center gap-8px">
					<SvgIcon className="text-icon" icon="ph:sign-out" />
					<span>退出登录</span>
				</div>
			),
		},
	]

	const onClick = () => {}

	return (
		<Dropdown menu={{ items, onClick }} placement="bottomRight" trigger={["click"]}>
			<ButtonIcon className="px-12px">
				<SvgIcon className="text-icon-large" icon="ph:user-circle" />
				<span className="text-16px font-medium">测试用户</span>
			</ButtonIcon>
		</Dropdown>
	)
})

export default GlobalUser
