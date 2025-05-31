import { colordTool } from "@aspen/common"
import type { AnyColor } from "@aspen/common"

import { TabPanelCssVarsProps } from "./type"

export const createTabPanelCssVars = (primaryColor: AnyColor): React.CSSProperties => {
	const cssProps: TabPanelCssVarsProps = {
		primaryColor,
		primaryColor1: colordTool.transformColorWithOpacity(primaryColor, 0.1, "#ffffff"),
		primaryColor2: colordTool.transformColorWithOpacity(primaryColor, 0.3, "#000000"),
		primaryColorOpacity1: colordTool.addColorAlpha(primaryColor, 0.1),
		primaryColorOpacity2: colordTool.addColorAlpha(primaryColor, 0.15),
		primaryColorOpacity3: colordTool.addColorAlpha(primaryColor, 0.3),
	}
	return {
		"--primary-color": cssProps.primaryColor,
		"--primary-color-opacity1": cssProps.primaryColorOpacity1,
		"--primary-color-opacity2": cssProps.primaryColorOpacity2,
		"--primary-color-opacity3": cssProps.primaryColorOpacity3,
		"--primary-color1": cssProps.primaryColor1,
		"--primary-color2": cssProps.primaryColor2,
	} as React.CSSProperties
}
