import { memo } from "react"
import { Switch, Input } from "antd"

import { store } from "@@/index"

import SettingItem from "./setting-item"

/**
 * 水印配置设置
 */
const WatermarkSetting: React.FC = memo(() => {
	const { themeStore } = store
	const { watermark } = themeStore.store((store) => store)

	const watermarkContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		themeStore.changeWatermarkContent(e.target.value)
	}

	return (
		<div className="flex-col items-stretch gap-12px">
			<SettingItem label="显示全屏水印">
				<Switch defaultChecked value={watermark.enable} onChange={themeStore.togglerWatermarkEnable} />
			</SettingItem>
			<SettingItem label="水印内容" show={watermark.enable}>
				<Input className="w-120px" value={watermark.content} onChange={watermarkContentChange} />
			</SettingItem>
		</div>
	)
})

export default WatermarkSetting
