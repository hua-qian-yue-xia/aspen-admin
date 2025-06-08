import React, { useState, useCallback } from "react"
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
	 * 点击事件
	 * @returns {boolean} 是否刷新成功
	 */
	change?: () => boolean | Promise<boolean>
}

const GlobalRefresh: React.FC<Props> = ({
	className,
	tooltipContent = "刷新",
	tooltipPlacement = "bottom",
	change,
}) => {
	const [isSpinning, setIsSpinning] = useState(false)
	const click = useCallback(async () => {
		if (isSpinning) return
		setIsSpinning(true)
		if (change) {
			const isDone = await change()
			if (isDone) setIsSpinning(false)
		} else {
			setTimeout(() => setIsSpinning(false), 1000)
		}
	}, [change, isSpinning])

	return (
		<ButtonIcon
			className={className}
			tooltipContent={tooltipContent}
			tooltipPlacement={tooltipPlacement}
			onClick={click}
		>
			<IconAntDesignReloadOutlined className={isSpinning ? "animate-spin animate-duration-750" : ""} />
		</ButtonIcon>
	)
}

export default GlobalRefresh
