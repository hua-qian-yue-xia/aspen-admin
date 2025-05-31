import React, { useMemo } from "react"

import { mergeClass } from "@aspen/common"

import "../../index.scss"

import SvgClose from "../svg-close"

import type { ComponentsProps } from "../../type"

/**
 * button 按钮风格
 */
const ButtonTab: React.FC<ComponentsProps> = ({
	children,
	uniqueCode,
	active = false,
	isDark = false,
	onClose,
	onActive,
}) => {
	const defaultClass = useMemo(() => {
		const style = [
			"button-tab",
			{ "button-tab_dark": isDark },
			{ "button-tab_active": active },
			{ "button-tab_active_dark": isDark },
		]
		return mergeClass("flex-row-center cursor-pointer px-12px py-4px border-(1px solid) rounded-4px gap-12px", style)
	}, [active, isDark])
	return (
		<div
			className={defaultClass}
			onClick={() => {
				onActive?.call(null, uniqueCode)
			}}
		>
			<span></span>
			<span>{children}</span>
			<SvgClose
				onClick={(e) => {
					e.stopPropagation()
					onClose?.call(null, uniqueCode)
				}}
			/>
		</div>
	)
}

export default ButtonTab
