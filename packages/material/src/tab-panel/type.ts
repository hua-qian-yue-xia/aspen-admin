import type { AnyColor } from "@aspen/common"

/**
 * tab项props
 */
export type ComponentsProps = React.ComponentProps<"div"> & {
	/**
	 * tab唯一标识
	 */
	uniqueCode: string
	/**
	 * 是否激活
	 * @default false
	 */
	active?: boolean
	/**
	 * 是否为黑暗模式
	 * @default false
	 */
	isDark?: boolean
	/**
	 * 关闭tab
	 */
	onClose?: (uniqueCode: string) => void
	/**
	 * 激活tab
	 */
	onActive?: (uniqueCode: string) => void
}

/**
 * tab风格
 */
export type TabPanelModeKey = "button" | "finder"

/**
 * tab props
 */
export type TabPanelProps = ComponentsProps & {
	/**
	 * tab风格
	 * - button 按钮风格
	 * - finder 访达风格
	 * @default button
	 */
	mode?: TabPanelModeKey
	/**
	 * 主题颜色
	 */
	primaryColor: AnyColor
}

// tab-panel 主题颜色
export type TabPanelCssVarsProps = {
	primaryColor: AnyColor
	primaryColor1: AnyColor
	primaryColor2: AnyColor
	primaryColorOpacity1: AnyColor
	primaryColorOpacity2: AnyColor
	primaryColorOpacity3: AnyColor
}
