import type { ConfigProviderProps } from "antd"
import { theme as antdTheme } from "antd"

import { colordTool } from "@aspen/common"

// 获取antd主题
export const getAntdTheme = (
	colors: Theme.ThemeColor,
	isDark: boolean,
	tokens: Theme.ThemeModeToken,
): ConfigProviderProps["theme"] => {
	// antd主题
	const { darkAlgorithm, defaultAlgorithm } = antdTheme
	// 主要颜色
	const { error, info, primary, success, warning } = colors
	// 计算出一个等效的不透明颜色。
	const bgColor = colordTool.transformColorWithOpacity(primary, isDark ? 0.3 : 0.1, isDark ? "#000000" : "#fff")
	const containerBgColor = isDark ? tokens.dark?.colors?.container : tokens.light?.colors.container
	return {
		algorithm: [isDark ? darkAlgorithm : defaultAlgorithm],
		components: {
			Button: {
				controlHeightSM: 28,
			},
			Collapse: {
				contentPadding: "16px 16px 24px 16px",
				headerBg: containerBgColor,
			},
			Menu: {
				darkItemBg: "transparent",
				darkSubMenuItemBg: "transparent",
				itemMarginInline: 8,
				itemSelectedBg: bgColor,
				subMenuItemBg: "transparent",
			},
		},
		cssVar: true,
		token: {
			colorBgContainer: containerBgColor,
			colorError: error,
			colorInfo: info,
			colorPrimary: primary,
			colorSuccess: success,
			colorWarning: warning,
		},
	}
}

// 创建调色板变量
export const createColorPaletteVars = (): Theme.ThemePaletteColor => {
	const colorPalettes: Array<Theme.ThemeColorKey> = ["primary", "info", "success", "warning", "error"]
	const colorPaletteNumbers: Array<Theme.ThemeColorPaletteNumber> = [
		50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
	]
	const colorPaletteVarObj = {} as Theme.ThemePaletteColor
	colorPalettes.forEach((color) => {
		colorPaletteVarObj[color] = `rgb(var(--${color}-color))`
		colorPaletteNumbers.forEach((number) => {
			colorPaletteVarObj[`${color}-${number}`] = `rgb(var(--${color}-${number}-color))`
		})
	})
	return colorPaletteVarObj
}

// 获取主题颜色变量
export const getThemeColorVars = (): Theme.ThemeToken => {
	const colorPaletteVars = createColorPaletteVars()
	return {
		boxShadow: {
			header: "var(--header-box-shadow)",
			sider: "var(--sider-box-shadow)",
			tab: "var(--tab-box-shadow)",
		},
		colors: {
			...colorPaletteVars,
			"base-text": "rgb(var(--base-text-color))",
			container: "rgb(var(--container-bg-color))",
			inverted: "rgb(var(--inverted-bg-color))",
			layout: "rgb(var(--layout-bg-color))",
			nprogress: "rgb(var(--nprogress-color))",
		},
	}
}
