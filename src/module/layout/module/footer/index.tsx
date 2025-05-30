import React, { memo } from "react"

import material from "@aspen/material"

import { useTabListren, useTab } from "./hooks/tab-hook"

const GlobalFooter: React.FC = memo(() => {
	useTabListren()
	const { tabs } = useTab()
	return (
		<div className="flex-row">
			{tabs.map((v) => {
				return (
					<material.TabPanel key={v.uniqueCode} uniqueCode={v.uniqueCode}>
						{v.title}
					</material.TabPanel>
				)
			})}
		</div>
	)
})

export default GlobalFooter
