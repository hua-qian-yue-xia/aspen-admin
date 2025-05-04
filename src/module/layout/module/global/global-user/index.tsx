import { Dropdown } from "antd"
import type { MenuProps } from "antd"

import ButtonIcon from "@/module/components/custom/button-icon"
import SvgIcon from "@/module/components/custom/svg-icon"

import { router } from "@@/index"

const GlobalUser: React.FC = memo(() => {
	const { useRouter } = router
	const { navigate } = useRouter()

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

	const onClick: MenuProps["onClick"] = (info) => {
		if (info.key === "0") {
			navigate("/user-center")
		}
		if (info.key === "1") {
			navigate("/login")
		}
	}

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
