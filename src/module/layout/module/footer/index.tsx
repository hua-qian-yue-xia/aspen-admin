import React, { memo } from "react"

import material from "@aspen/material"

import { components } from "@@/index"

import { useTabListren, useTab } from "./hooks/tab-hook"

const { common } = components

const GlobalFooter: React.FC = memo(() => {
	useTabListren()
	const { tabs } = useTab()
	return (
		<common.DarkModeContainer className="full">
			<div className="flex-row">
				{tabs.map((v) => {
					return <material.TabPanel key={v.uniqueCode}>{v.title}</material.TabPanel>
				})}
			</div>
		</common.DarkModeContainer>
	)
})

export default GlobalFooter
