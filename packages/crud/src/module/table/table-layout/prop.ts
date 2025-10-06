import React from "react"

export type CrudLayoutTableShow = {
	/**
	 * @name 是否显示右侧`刷新`按钮
	 * @default true
	 */
	headLeft?: {
		/**
		 * @name 是否显示左侧标题区域
		 * @default true
		 */
		title?: boolean
	}
	/**
	 * @name 右侧
	 */
	headRight?: {
		/**
		 * @name 是否显示右侧`刷新`按钮
		 * @default true
		 */
		refresh?: boolean
		/**
		 * @name 是否显示右侧`表格全屏`按钮
		 * @default true
		 */
		fullscreen?: boolean
		/**
		 * @name 是否显示右侧`列设置`按钮
		 * @default true
		 */
		columnSetting?: boolean
		/**
		 * @name 是否显示右侧`其他`按钮
		 * @default true
		 */
		other?: boolean
	}
}

export type CrudLayoutTableRender = {
	/**
	 * @name 左侧自定义内容
	 */
	left?: React.ReactNode
	/**
	 * @name 右侧自定义内容
	 */
	right?: React.ReactNode
}
