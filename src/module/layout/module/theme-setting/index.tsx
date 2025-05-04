import React from "react"
import { Divider, Drawer } from "antd"

import material from "@aspen/material"

import ButtonIcon from "@/module/components/custom/button-icon"
import { store } from "@@/index"

import PageSetting from "./components/page-setting"

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
			onClose={close}
		>
			<material.SimpleScrollbar>
				<div className="overflow-x-hidden px-24px pb-24px pt-8px">
					<Divider>主题模式</Divider>
					<Divider>主题颜色</Divider>
					<Divider>页面配置</Divider>
					<PageSetting />
				</div>
			</material.SimpleScrollbar>
		</Drawer>
	)
})

export default ThemeDrawer
