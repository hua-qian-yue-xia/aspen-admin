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
		// 主题模式图标
		modeIcons: Record<ThemeModeType, string>
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
}

export const store = create<ThemeStore>()(
	immer(
		devtools(
			persist(
				() => {
					return {
						theme: {
							drawerVisible: false,
							modeIcons: {
								dark: "material-symbols:nightlight-rounded",
								light: "material-symbols:sunny",
								system: "material-symbols:hdr-auto",
							},
							mode: "system",
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
					}
				},
				{ name: "SYS-THEME" },
			),
		),
	),
)

// 改变header高度
export const changeHeaderHeight = (height: number) => {
	store.setState((state) => {
		state.header.height = height
	})
}

export const changeThemeMode = () => {
	store.setState((state) => {
		state.theme.mode = state.theme.mode === "dark" ? "light" : "dark"
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
