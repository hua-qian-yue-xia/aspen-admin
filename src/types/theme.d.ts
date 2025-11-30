declare namespace Theme {
	type OtherColor = {
		/**
		 * 错误色
		 */
		error: string
		/**
		 * 信息色
		 */
		info: string
		/**
		 * 成功色
		 */
		success: string
		/**
		 * 警告色
		 */
		warning: string
	}

	type ThemeColor = OtherColor & {
		/**
		 * 主色
		 */
		primary: string
	}

	type ThemeColorKey = keyof ThemeColor

	/**
	 * 调色板编号主色为500
	 */
	type ThemeColorPaletteNumber = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

	/**
	 * 调色板编号下标主色下表为6
	 */
	type ThemeColorPaletteIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

	/**
	 * 调色板颜色对象
	 */
	type ThemePaletteColor = {
		[key in ThemeColorKey | `${ThemeColorKey}-${ThemeColorPaletteNumber}`]: string
	}

	/**
	 * 主题token阴影颜色
	 */
	type ThemeTokenBoxShadow = {
		header: string
		sider: string
		tab: string
	}

	/**
	 * 主题token颜色
	 */
	type ThemeTokenColor = {
		"base-text": string
		container: string
		inverted: string
		layout: string
		/** nprogress插件主题颜色 */
		nprogress?: string
	}

	/**
	 * 主题token
	 */
	type ThemeToken = {
		/**
		 * 阴影颜色
		 */
		boxShadow: ThemeTokenBoxShadow
		/**
		 * 主题颜色
		 */
		colors: ThemeTokenColor
	}

	type ThemeTokenCSSVars = {
		/**
		 * 阴影颜色
		 */
		boxShadow: ThemeTokenBoxShadow & Record<string, string>
		/**
		 * 主题颜色
		 */
		colors: ThemeTokenColor & ThemePaletteColor & Record<string, string>
	}

	type ThemeModeToken = {
		light: Theme.ThemeToken
		// 暗色主题
		dark: {
			[K in keyof Theme.ThemeToken]?: Partial<Theme.ThemeToken[K]>
		}
	}

	type ThemeMainAnimateMode = "fade" | "fade-bottom" | "fade-scale" | "fade-slide" | "none" | "zoom-fade" | "zoom-out"
}
