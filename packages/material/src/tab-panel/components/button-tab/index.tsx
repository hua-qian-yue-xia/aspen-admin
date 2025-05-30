import React, { useMemo } from "react"

import { mergeClass } from "@aspen/common"

import SvgClose from "../svg-close"

import type { ComponentsProps } from "../../type"

/**
 * button 按钮风格
 */
const ButtonTab: React.FC<ComponentsProps> = ({ children, uniqueCode, active = false, onClose, onActive }) => {
	const defaultClass = useMemo(() => {
		return mergeClass("flex-row-center cursor-pointer px-12px py-4p border-(1px solid) rounded-4px gap-12px")
	}, [])
	return (
		<div className={defaultClass} onClick={onActive?.call(uniqueCode)}>
			<span></span>
			<span>{children}</span>
			<SvgClose
				onClick={(e) => {
					e.stopPropagation() // 阻止事件冒泡
					onClose?.call(uniqueCode)
				}}
			/>
		</div>
	)
}

export default ButtonTab
