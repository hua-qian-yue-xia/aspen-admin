import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

import type { ThemeModeType } from "ahooks/lib/useTheme"

type ThemeStore = {
	theme: {
		// 抽屉是否弹出
		drawerVisible: boolean
		// 主题模式
		mode: ThemeModeType
		// 主题颜色
		colors: Theme.ThemeColor
		// 信息色是否跟随主色
		isInfoFollowPrimary: boolean
		// 主题模式图标
		modeIcons: Record<ThemeModeType, string>
		// 只展开当前父级菜单
		onlyExpandParentMenu: boolean
	}
	// header配置
	header: {
		// 高度
		height: number
	}
	footer: {
		// 高度
		height: number
	}
	aside: {
		// 宽度
		width: number
		// 折叠宽度
		collapsedWidth: number
		// 折叠状态
		collapsed: boolean
	}
	watermark: {
		// 是否开启
		enable: boolean
		// 水印内容
		content: string
	}
}

const defaultThemeStore = (): ThemeStore => {
	return {
		theme: {
			drawerVisible: false,
			modeIcons: {
				dark: "material-symbols:nightlight-rounded",
				light: "material-symbols:sunny",
				system: "material-symbols:hdr-auto",
			},
			colors: {
				primary: "#3b82f6",
				error: "#ef4444",
				info: "#3b82f6",
				success: "#10b981",
				warning: "#f97316",
			},
			isInfoFollowPrimary: false,
			mode: "system",
			onlyExpandParentMenu: true,
		},
		header: {
			height: 50,
		},
		footer: {
			height: 40,
		},
		aside: {
			width: 200,
			collapsedWidth: 65,
			collapsed: true,
		},
		watermark: {
			enable: false,
			content: "aspen",
		},
	}
}

export const store = create<ThemeStore>()(immer(devtools(persist(() => defaultThemeStore(), { name: "SYS-THEME" }))))

// 改变header高度
export const changeHeaderHeight = (height: number) => {
	store.setState((state) => {
		state.header.height = height
	})
}

// 改变主题模式
export const changeThemeMode = (mode?: ThemeModeType) => {
	store.setState((state) => {
		if (!mode) {
			state.theme.mode = state.theme.mode === "dark" ? "light" : "dark"
			return
		}
		if (state.theme.mode !== mode) {
			state.theme.mode = mode
		}
	})
}

// 信息色是否跟随主色开关
export const togglerInfoFollowPrimary = () => {
	store.setState((state) => {
		state.theme.isInfoFollowPrimary = !state.theme.isInfoFollowPrimary
		state.theme.colors.info = state.theme.isInfoFollowPrimary
			? state.theme.colors.primary
			: defaultThemeStore().theme.colors.info
	})
}

// 根据颜色key改变颜色
export const changeThemeColor = (key: Theme.ThemeColorKey, value: string) => {
	store.setState((state) => {
		if (state.theme.colors[key] === value) {
			return
		}
		state.theme.colors[key] = value
	})
}

// 侧边栏开关
export const togglerAsideCollapsed = () => {
	store.setState((state) => {
		state.aside.collapsed = !state.aside.collapsed
	})
}

// 改变侧边栏宽度
export const changeAsideWidth = (width: number) => {
	store.setState((state) => {
		state.aside.width = width
	})
}

// 改变侧边栏折叠宽度
export const changeAsideCollapsedWidth = (width: number) => {
	store.setState((state) => {
		state.aside.collapsedWidth = width
	})
}

// 主题抽屉开关
export const togglerThemeDrawerVisible = () => {
	store.setState((state) => {
		state.theme.drawerVisible = !state.theme.drawerVisible
	})
}

// 改变footer高度
export const changeFooterHeight = (height: number) => {
	store.setState((state) => {
		state.footer.height = height
	})
}

// 全屏水印开关
export const togglerWatermarkEnable = () => {
	store.setState((state) => {
		state.watermark.enable = !state.watermark.enable
	})
}

// 改变水印内容
export const changeWatermarkContent = (value: string) => {
	store.setState((state) => {
		state.watermark.content = value
	})
}

// 只展开当前父级菜单开关
export const togglerOnlyExpandParentMenu = () => {
	store.setState((state) => {
		state.theme.onlyExpandParentMenu = !state.theme.onlyExpandParentMenu
	})
}

// 重置主题
export const resetThemeStore = () => {
	store.setState((state) => {
		const defaultTheme = defaultThemeStore()
		const cancelTheme = Object.assign(defaultTheme, {
			theme: { ...defaultTheme.theme, drawerVisible: state.theme.drawerVisible, modeIcons: state.theme.modeIcons },
			aside: { ...defaultTheme.aside, collapsed: state.aside.collapsed },
		})
		return cancelTheme
	})
}
