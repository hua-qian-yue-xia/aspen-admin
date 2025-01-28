import { type CSSProperties } from "react"

import { Button, Tooltip } from "antd"
import type { ButtonProps, TooltipProps } from "antd"

import SvgIcon from "./svg-icon"

type Props = {
	readonly children?: React.ReactNode
	readonly className?: string
	readonly style?: CSSProperties
	/**
	 * Iconify 网络图标
	 * @see https://icones.js.org
	 */
	readonly icon?: string
	/**
	 * 提示内容
	 */
	readonly tooltipContent?: string
	/**
	 * 提示位置
	 */
	readonly tooltipPlacement?: TooltipProps["placement"]
} & Omit<ButtonProps, "icon" | "iconPosition">

const ButtonIcon: React.FC<Props> = (props) => {
	const {
		children,
		className = "h-36px text-icon",
		style,
		icon,
		tooltipContent,
		tooltipPlacement = "bottom",
		...rest
	} = props
	const computeClass = useMemo(() => {
		let classStr = className
		if (!classStr.includes("h-")) classStr += " h-36px"
		if (!classStr.includes("text-")) classStr += " text-icon"
		return classStr
	}, [className])
	return (
		<Tooltip title={tooltipContent} placement={tooltipPlacement}>
			<Button type="text" className={computeClass} {...rest}>
				<div className="flex-row-center gap-8px">{children || <SvgIcon icon={icon} style={style} />}</div>
			</Button>
		</Tooltip>
	)
}

export default ButtonIcon
