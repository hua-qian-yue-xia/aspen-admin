import React from "react"

import { mergeClass } from "@aspen/common"

import type { ComponentsProps } from "../../type"

/**
 * finder 访达风格
 */
const FinderTab: React.FC<ComponentsProps> = ({ children }) => {
	const defaultClass = useMemo(() => {
		return mergeClass("flex-row-center cursor-pointer px-12px py-4p border-(1px solid) rounded-4px gap-12px")
	}, [])
	return (
		<div className={defaultClass}>
			<span></span>
			<span>{children}</span>
			<span></span>
		</div>
	)
}

export default FinderTab
