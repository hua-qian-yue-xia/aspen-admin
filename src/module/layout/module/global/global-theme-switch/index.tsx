import ButtonIcon from "@/module/components/custom/button-icon"

import { store } from "@@/index"

const GlobalThemeSwitch: React.FC = memo(() => {
	const { themeStore } = store
	const { mode, modeIcons } = themeStore.store((store) => store.theme)

	const themeModeChange = () => {
		themeStore.changeThemeMode()
	}

	return (
		<ButtonIcon tooltipContent="主题模式" tooltipPlacement="bottom" icon={modeIcons[mode]} onClick={themeModeChange} />
	)
})

export default GlobalThemeSwitch
