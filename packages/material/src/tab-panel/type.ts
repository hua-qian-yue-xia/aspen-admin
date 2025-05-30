import type { PropsWithChildren } from "react"

/**
 * tab项props
 */
export type ComponentsProps = PropsWithChildren & {
	/**
	 * tab唯一标识
	 */
	uniqueCode: string
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
}
