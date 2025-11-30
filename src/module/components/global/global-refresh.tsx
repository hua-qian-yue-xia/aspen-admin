import React from "react"
import type { TooltipProps } from "antd"

import ButtonIcon from "../custom/button-icon"

type Props = {
	className?: string
	/**
	 * 提示内容
	 * @default "刷新"
	 */
	tooltipContent?: string
	/**
	 * 提示位置
	 * @default "bottom"
	 */
	tooltipPlacement?: TooltipProps["placement"]
	/**
	 * 是否显示旋转动画
	 * @default false
	 */
	loading?: boolean
	/**
	 * 点击事件
	 */
	click?: () => void | Promise<void>
}

const GlobalRefresh: React.FC<Props> = ({
	className,
	tooltipContent = "刷新",
	tooltipPlacement = "bottom",
	loading = false,
	click,
}) => {
	return (
		<ButtonIcon
			className={className}
			tooltipContent={tooltipContent}
			tooltipPlacement={tooltipPlacement}
			onClick={click}
		>
			<IconAntDesignReloadOutlined className={loading ? "animate-spin animate-duration-750" : ""} />
		</ButtonIcon>
	)
}

export default GlobalRefresh
