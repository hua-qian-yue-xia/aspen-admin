import React from "react"
import { Divider, Drawer } from "antd"

import material from "@aspen/material"

import ButtonIcon from "@/module/components/custom/button-icon"
import { store } from "@@/index"

import ThemeModeSetting from "./components/theme-mode-setting"
import ThemeColorSetting from "./components/theme-color-setting"
import ThemeLayoutSetting from "./components/theme-layout-setting"
import PageSetting from "./components/page-setting"
import WatermarkSetting from "./components/watermark-setting"
import ThemeDrawerOperation from "./components/theme-drawer-operation"

const ThemeDrawer: React.FC = memo(() => {
	const { themeStore } = store
	const { theme } = themeStore.store((store) => store)

	const close = () => {
		themeStore.togglerThemeDrawerVisible()
	}

	return (
		<Drawer
			closeIcon={false}
			title="主题配置"
			styles={{ body: { padding: 0 } }}
			open={theme.drawerVisible}
			extra={<ButtonIcon className="h-28px" icon="ant-design:close-outlined" onClick={close} />}
			footer={<ThemeDrawerOperation />}
			onClose={close}
		>
			<material.SimpleScrollbar>
				<div className="overflow-x-hidden px-24px pb-24px pt-8px">
					<Divider>主题模式</Divider>
					<ThemeModeSetting />
					<Divider>布局模式</Divider>
					<ThemeLayoutSetting />
					<Divider>主题颜色</Divider>
					<ThemeColorSetting />
					<Divider>页面配置</Divider>
					<PageSetting />
					<Divider>水印配置</Divider>
					<WatermarkSetting />
				</div>
			</material.SimpleScrollbar>
		</Drawer>
	)
})

export default ThemeDrawer
