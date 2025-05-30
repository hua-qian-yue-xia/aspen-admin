import React from "react"
import type { PropsWithChildren } from "react"

import { App, ConfigProvider, Watermark } from "antd"
import type { WatermarkProps } from "antd"

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
	const { langStore, themeStore, themeShared } = store
	const { antdLocaleList, locale } = langStore.store((state) => state)
	const { watermark, theme } = themeStore.store((state) => state)

	return (
		<ConfigProvider
			button={{ classNames: { icon: "align-1px  text-icon" } }}
			card={{ styles: { body: { flex: 1, overflow: "hidden", padding: "12px 16px " } } }}
			locale={antdLocaleList[locale]}
			theme={themeShared.getAntdTheme(theme.colors, false)}
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
