import { memo } from "react"
import { Switch } from "antd"

import { store, components } from "@@/index"

import SettingItem from "./setting-item"

/**
 * 主题模式设置
 */
const ThemeModeSetting: React.FC = memo(() => {
	const { themeStore } = store
	const { theme: themeComponents } = components
	const { theme } = themeStore.store((store) => store)
	return (
		<div className="flex-col items-stretch gap-12px">
			<themeComponents.ThemeSegmented />
			<SettingItem label="仅展开当前父级菜单">
				<Switch defaultChecked value={theme.onlyExpandParentMenu} onChange={themeStore.togglerOnlyExpandParentMenu} />
			</SettingItem>
		</div>
	)
})

export default ThemeModeSetting
