import React from "react"
import type { TooltipProps } from "antd"

import ButtonIcon from "../custom/button-icon"

type Props = {
	className?: string
	/**
	 * 提示内容
	 */
	tooltipContent?: string
	/**
	 * 提示位置
	 * @default "bottom"
	 */
	tooltipPlacement?: TooltipProps["placement"]
	/**
	 * 是否全屏
	 * @default false
	 */
	fullScreen?: boolean
	/**
	 * 切换全屏
	 */
	toggle?: () => void
}

const GlobalFullScreen: React.FC<Props> = ({
	className,
	tooltipContent,
	tooltipPlacement = "bottom",
	fullScreen = false,
	toggle,
}) => {
	return (
		<ButtonIcon
			className={className}
			tooltipContent={tooltipContent}
			tooltipPlacement={tooltipPlacement}
			onClick={toggle}
		>
			{fullScreen ? <IconGridiconsFullscreenExit /> : <IconGridiconsFullscreen />}
		</ButtonIcon>
	)
}

export default GlobalFullScreen
