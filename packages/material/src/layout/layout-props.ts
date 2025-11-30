import React from "react"

export type Header = {
	headerNode?: React.ReactNode
	headerVisible?: boolean
	headerHeight?: number
}

export type Tab = {
	tabNode?: React.ReactNode
	tabVisible?: boolean
	tabHeight?: number
}

export type Aside = {
	asideNode?: React.ReactNode
	asideVisible?: boolean
	asideCollapse?: boolean
	asideWidth?: number
	asideCollapseWidth?: number
}

export type Main = {
	mainNode?: React.ReactNode
}

export type Footer = {
	footerNode?: React.ReactNode
	footerVisible?: boolean
	footerHeight?: number
}

export type Props = Header &
	Tab &
	Aside &
	Main &
	Footer & {
		commonClass?: string
	} & {
		/**
		 * 布局最大 z-index
		 * @default 1000
		 */
		maxZIndex?: number
	}

export const defaultProps: Props = {
	headerVisible: true,
	headerHeight: 56,
	tabVisible: true,
	tabHeight: 46,
	asideVisible: true,
	asideCollapse: true,
	asideWidth: 64,
	asideCollapseWidth: 220,
	footerVisible: true,
	footerHeight: 46,
	commonClass: "transition-all-300",
	maxZIndex: 1000,
}
