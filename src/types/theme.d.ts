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
}
