import type { PropsWithChildren } from "react"

/**
 * tab项props
 */
export type ComponentsProps = PropsWithChildren & {
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
}
