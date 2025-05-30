declare namespace SysKey {
	namespace Menu {
		/**
		 * 菜单布局模式
		 * - horizontal 水平布局
		 * - vertical 垂直布局
		 */
		type LayoutMode = "horizontal" | "vertical"

		type MenuItem = Required<import("antd").MenuProps>["items"][number]
	}
	namespace Tab {
		type TabObj = {
			/**
			 * 菜单id
			 */
			uniqueCode: string
			/**
			 * 菜单标题
			 */
			title: string
			/**
			 * Iconify 网络图标
			 * @see https://icones.js.org
			 */
			icon?: string
		}
	}
}
