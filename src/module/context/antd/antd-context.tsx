import React, { useEffect } from "react"
import type { PropsWithChildren } from "react"

import { App, ConfigProvider, Watermark } from "antd"
import type { WatermarkProps } from "antd"

import { useMount } from "ahooks"

import { store } from "@@/index"

const ContextHolder: React.FC = () => {
	const { message, modal, notification } = App.useApp()
	window.$message = message
	window.$modal = modal
	window.$notification = notification
	return null
}

const watermarkConfig: WatermarkProps = {
	font: {
		fontSize: 16,
	},
	height: 128,
	offset: [12, 60],
	rotate: -15,
	width: 240,
	zIndex: 9999,
}

const GlobalAntdProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { langStore, themeStore, themePaletteShared, themeShared } = store
	const { antdLocaleList, locale } = langStore.store((state) => state)
	const { watermark, theme } = themeStore.store((state) => state)

	// 设置主题色
	useEffect(() => {
		themePaletteShared.setupThemeVarsToHtml(theme.colors, theme.tokens)
	}, [theme.colors, theme.tokens, themePaletteShared])

	// 设置主题class
	useEffect(() => {
		const htmlElementClassList = document.documentElement.classList
		if (theme.isDark) {
			htmlElementClassList.add("dark")
		} else {
			htmlElementClassList.remove("dark")
		}
	}, [theme.isDark])

	// 监听用户主题模式切换
	useMount(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
		const handler = (event: MediaQueryListEvent) => {
			console.log("matches:", event.matches)
			if (theme.mode !== "system") return
		}
		return () => {
			mediaQuery.removeEventListener("change", handler)
		}
	})

	return (
		<ConfigProvider
			button={{ classNames: { icon: "align-1px  text-icon" } }}
			card={{ styles: { body: { flex: 1, overflow: "hidden", padding: "12px 16px " } } }}
			locale={antdLocaleList[locale]}
			theme={themeShared.getAntdTheme(theme.colors, theme.isDark, theme.tokens)}
		>
			<Watermark className="full" content={watermark.enable ? watermark.content : ""} {...watermarkConfig}>
				<App className="full">
					<ContextHolder />
					{children}
				</App>
			</Watermark>
		</ConfigProvider>
	)
}
export default GlobalAntdProvider
