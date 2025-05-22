import React, { memo } from "react"
import { Checkbox } from "antd"

import material from "@aspen/material"

import { store } from "@@/index"

import SettingItem from "./setting-item"

const colors: Array<{ title: string; key: Theme.ThemeColorKey }> = [
	{
		title: "主色",
		key: "primary",
	},
	{
		title: "错误色",
		key: "error",
	},
	{
		title: "信息色",
		key: "info",
	},
	{
		title: "成功色",
		key: "success",
	},
	{
		title: "警告色",
		key: "warning",
	},
]

/**
 * 主题颜色设置
 */
const ThemeColorSetting: React.FC = memo(() => {
	const { themeStore } = store
	const { theme } = themeStore.store((state) => state)

	const renderer = (key: string): React.ReactNode => {
		if (key === "info") {
			return (
				<Checkbox className="mx-1" checked={theme.isInfoFollowPrimary} onChange={themeStore.togglerInfoFollowPrimary}>
					跟随主色
				</Checkbox>
			)
		}
		return null
	}

	return (
		<div className="flex-col items-stretch gap-12px">
			{colors.map((v) => {
				return (
					<SettingItem key={v.key} label={v.title} suffix={renderer(v.key)}>
						<material.CustomColorPicker
							trigger="hover"
							value={theme.color[v.key]}
							onChange={(color) => themeStore.changeThemeColor(v.key, color)}
						/>
					</SettingItem>
				)
			})}
		</div>
	)
})

export default ThemeColorSetting
