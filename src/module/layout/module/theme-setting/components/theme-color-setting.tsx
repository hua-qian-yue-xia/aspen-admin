import { memo } from "react"

import material from "@aspen/material"

import SettingItem from "./setting-item"

/**
 * 主题颜色设置
 */
const ThemeColorSetting: React.FC = memo(() => {
	return (
		<div className="flex-col items-stretch gap-12px">
			<SettingItem label="主色">
				<material.CustomColorPicker trigger="hover" value="" />
			</SettingItem>
			<SettingItem label="错误色">
				<material.CustomColorPicker trigger="hover" value="" />
			</SettingItem>
			<SettingItem label="信息色">
				<material.CustomColorPicker trigger="hover" value="" />
			</SettingItem>
			<SettingItem label="成功色">
				<material.CustomColorPicker trigger="hover" value="" />
			</SettingItem>
			<SettingItem label="警告色">
				<material.CustomColorPicker trigger="hover" value="" />
			</SettingItem>
		</div>
	)
})

export default ThemeColorSetting
