import { type CSSProperties } from "react"

import { Button, Tooltip } from "antd"
import type { ButtonProps, TooltipProps } from "antd"

import SvgIcon from "./svg-icon"

type Props = {
	readonly children?: React.ReactNode
	readonly className?: string
	readonly style?: CSSProperties
	/**
	 * Iconify 图标
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
	/**
	 * 按钮类型
	 * @default "text"
	 */
	readonly buttonType?: Extract<ButtonProps["type"], "link" | "text">
} & Omit<ButtonProps, "icon" | "iconPosition" | "type">

const ButtonIcon: React.FC<Props> = (props) => {
	const {
		children,
		className = "h-36px text-icon",
		style,
		icon,
		tooltipContent,
		tooltipPlacement = "bottom",
		buttonType = "text",
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
			<Button type={buttonType} className={computeClass} {...rest}>
				<div className="flex-row-center gap-8px">{children || <SvgIcon icon={icon} style={style} />}</div>
			</Button>
		</Tooltip>
	)
}

export default ButtonIcon
