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
}
