import React from "react"

import type { TooltipProps } from "antd"

import ButtonIcon from "../custom/button-icon"

type Props = {
	className?: string
	/**
	 * 提示内容
	 * @default "下载列表"
	 */
	tooltipContent?: string
	/**
	 * 提示位置
	 * @default "bottom"
	 */
	tooltipPlacement?: TooltipProps["placement"]
	/**
	 * 点击
	 */
	change: () => void
}

const GlobalDownload: React.FC<Props> = ({
	className,
	tooltipContent = "下载列表",
	tooltipPlacement = "bottom",
	change,
}) => {
	return (
		<ButtonIcon
			className={className}
			tooltipContent={tooltipContent}
			tooltipPlacement={tooltipPlacement}
			onClick={change}
		></ButtonIcon>
	)
}

export default GlobalDownload
