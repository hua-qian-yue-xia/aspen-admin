import type { PropsWithChildren } from "react"

import { mergeClass } from "@aspen/common"

type Props = PropsWithChildren<{
	className?: string
	label: React.ReactNode
	show?: boolean
	suffix?: React.ReactNode
}>

const BaseSettingItem: React.FC<Props> = ({ className, label, show = true, suffix, children }) => {
	if (!show) return null
	return (
		<div className={mergeClass(className, "full flex-row items-center justify-between")}>
			<div className="flex-row-center">
				<span className="pr-8px text-base-text">{label}</span>
				{suffix}
			</div>
			{children}
		</div>
	)
}

export default BaseSettingItem
