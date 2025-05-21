import React from "react"
import { Button } from "antd"

import { store } from "@@/index"

const ThemeDrawerOperation: React.FC = () => {
	const { themeStore } = store

	const doReset = () => {
		themeStore.resetThemeStore()
		setTimeout(() => {
			window.$message.success("重置成功")
		}, 100)
	}
	const doCopy = () => {
		setTimeout(() => {
			window.$message.success("复制成功")
		}, 100)
	}
	return (
		<div className="flex justify-between">
			<Button danger onClick={doReset}>
				重置配置
			</Button>
			<Button type="primary" onClick={doCopy}>
				复制配置
			</Button>
		</div>
	)
}

export default ThemeDrawerOperation
