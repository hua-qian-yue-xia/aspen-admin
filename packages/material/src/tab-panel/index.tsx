import React from "react"

import type { ComponentsProps, TabPanelModeKey, TabPanelProps } from "./type"

import ButtonTab from "./components/button-tab/index"
import FinderTab from "./components/finder-tab/index"

const modes: Record<TabPanelModeKey, { component: React.FC<ComponentsProps> }> = {
	button: {
		component: ButtonTab,
	},
	finder: {
		component: FinderTab,
	},
}

const TabPanel: React.FC<TabPanelProps> = ({ children, mode = "button", uniqueCode }) => {
	const CurrentComponent = modes[mode].component

	return (
		<div>
			<CurrentComponent uniqueCode={uniqueCode}>{children}</CurrentComponent>
		</div>
	)
}

export default TabPanel
