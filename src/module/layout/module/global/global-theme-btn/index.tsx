import ButtonIcon from "@/module/components/custom/button-icon"

import { store } from "@@/index"

const GlobalThemeBtn: React.FC = memo(() => {
	const { themeStore } = store
	return (
		<ButtonIcon
			tooltipContent="主题配置"
			icon="majesticons:color-swatch-line"
			onClick={() => themeStore.togglerThemeDrawerVisible()}
		/>
	)
})

export default GlobalThemeBtn
