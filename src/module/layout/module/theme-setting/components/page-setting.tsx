import React from "react"
import { InputNumber } from "antd"

import { store } from "@@/index"

import SettingItem from "./setting-item"

/**
 * 页面配置设置
 */
const PageSetting: React.FC = memo(() => {
	const { themeStore } = store
	const { header, aside, footer } = themeStore.store((store) => store)
	return (
		<div className="flex-col items-stretch gap-12px">
			{/* 头部配置 */}
			<SettingItem label="头部高度">
				<InputNumber className="w-120px" value={header.height} onChange={(v) => themeStore.changeHeaderHeight(v)} />
			</SettingItem>
			{/* 侧边栏配置 */}
			<SettingItem label="侧边栏宽度">
				<InputNumber className="w-120px" value={aside.width} onChange={(v) => themeStore.changeAsideWidth(v)} />
			</SettingItem>
			<SettingItem label="侧边栏折叠宽度">
				<InputNumber
					className="w-120px"
					value={aside.collapsedWidth}
					onChange={(v) => themeStore.changeAsideCollapsedWidth(v)}
				/>
			</SettingItem>
			{/* 底部配置 */}
			<SettingItem label="底部高度">
				<InputNumber className="w-120px" value={footer.height} onChange={(v) => themeStore.changeFooterHeight(v)} />
			</SettingItem>
		</div>
	)
})

export default PageSetting
