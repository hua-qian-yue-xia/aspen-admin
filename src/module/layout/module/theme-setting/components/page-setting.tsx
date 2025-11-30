import React from "react"
import { InputNumber, Select, Switch } from "antd"

import { store } from "@@/index"
import { themeMainAnimationModeOptions } from "@@/store/module/theme/theme-constant"

import SettingItem from "./setting-item"

/**
 * 页面配置设置
 */
const PageSetting: React.FC = memo(() => {
	const { themeStore } = store
	const { header, aside, footer, main } = themeStore.store((store) => store)

	const inputSuffix = () => "px"

	return (
		<div className="flex-col items-stretch gap-12px">
			{/* 动画配置 */}
			<SettingItem label="页面切换动画">
				<Switch defaultChecked value={main.animate} onChange={themeStore.togglerMainAnimate} />
			</SettingItem>
			<SettingItem label="页面切换动画模式">
				<Select
					className="w-120px"
					defaultValue={main.animateMode}
					options={themeMainAnimationModeOptions.map((item) => ({
						label: item.value,
						value: item.label,
					}))}
					onChange={(value) => themeStore.changeMainAnimateMode(value)}
				/>
			</SettingItem>
			{/* 头部配置 */}
			<SettingItem label="头部高度">
				<InputNumber
					className="w-120px"
					value={header.height}
					suffix={inputSuffix()}
					onChange={(v) => themeStore.changeHeaderHeight(v)}
				/>
			</SettingItem>
			{/* 侧边栏配置 */}
			<SettingItem label="侧边栏宽度">
				<InputNumber
					className="w-120px"
					value={aside.width}
					suffix={inputSuffix()}
					onChange={(v) => themeStore.changeAsideWidth(v)}
				/>
			</SettingItem>
			<SettingItem label="侧边栏折叠宽度">
				<InputNumber
					className="w-120px"
					value={aside.collapsedWidth}
					suffix={inputSuffix()}
					onChange={(v) => themeStore.changeAsideCollapsedWidth(v)}
				/>
			</SettingItem>
			{/* 底部配置 */}
			<SettingItem label="底部高度">
				<InputNumber
					className="w-120px"
					value={footer.height}
					suffix={inputSuffix()}
					onChange={(v) => themeStore.changeFooterHeight(v)}
				/>
			</SettingItem>
		</div>
	)
})

export default PageSetting
