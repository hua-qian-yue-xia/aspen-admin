import { Segmented } from "antd"
import type { SegmentedProps } from "antd"

import { store, components } from "@@/index"

const ThemeSegmented: React.FC = () => {
	const { themeStore } = store
	const { custom } = components
	const { theme } = themeStore.store((state) => state)

	const rendererOptions: SegmentedProps["options"] = Object.keys(theme.modeIcons).map((key) => {
		return {
			label: (
				<div className="flex-1 flex-row-center">
					<custom.SvgIcon className="h-28px text-icon-small" icon={theme.modeIcons[key]} />
				</div>
			),
			value: key,
		}
	})

	return <Segmented block options={rendererOptions} value={theme.mode} onChange={themeStore.changeThemeMode} />
}

export default ThemeSegmented
