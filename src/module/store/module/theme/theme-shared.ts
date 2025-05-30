import type { ConfigProviderProps } from "antd"
import { theme as antdTheme } from "antd"

export const getAntdTheme = (colors: Theme.ThemeColor, darkMode: boolean): ConfigProviderProps["theme"] => {
	// antd主题
	const { darkAlgorithm, defaultAlgorithm } = antdTheme
	// 主要颜色
	const { error, info, primary, success, warning } = colors
	return {
		algorithm: [darkMode ? darkAlgorithm : defaultAlgorithm],
		components: {
			Button: {
				controlHeightSM: 28,
			},
			Collapse: {
				contentPadding: "16px 16px 24px 16px",
			},
			Menu: {
				darkItemBg: "transparent",
				darkSubMenuItemBg: "transparent",
				itemMarginInline: 8,
				subMenuItemBg: "transparent",
			},
		},
		cssVar: true,
		token: {
			colorError: error,
			colorInfo: info,
			colorPrimary: primary,
			colorSuccess: success,
			colorWarning: warning,
		},
	}
}
