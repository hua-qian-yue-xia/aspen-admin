import React from "react"

import type { ComponentsProps, TabPanelModeKey, TabPanelProps } from "./type"
import { createTabPanelCssVars } from "./shared"
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

const TabPanel: React.FC<TabPanelProps> = ({ children, mode = "button", primaryColor, ...rest }) => {
	const CurrentComponent = modes[mode].component
	// 动态生成css主题变量
	const cssVars = createTabPanelCssVars(primaryColor)

	return (
		<div style={cssVars}>
			<CurrentComponent {...rest}>{children}</CurrentComponent>
		</div>
	)
}

export default TabPanel
