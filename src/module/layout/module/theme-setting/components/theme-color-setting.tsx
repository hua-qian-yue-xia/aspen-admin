import { memo } from "react"

import SettingItem from "./setting-item"

const ThemeColorSetting: React.FC = memo(() => {
	return (
		<div className="flex-col items-stretch gap-12px">
			<SettingItem label="主色"></SettingItem>
			<SettingItem label="错误色"></SettingItem>
			<SettingItem label="信息色"></SettingItem>
			<SettingItem label="成功色"></SettingItem>
			<SettingItem label="警告色"></SettingItem>
		</div>
	)
})

export default ThemeColorSetting
