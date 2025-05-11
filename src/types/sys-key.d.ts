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

	namespace Route {
		type RouteItem = import("react-router-dom").RouteObject & {
			handle: {
				icon: string
				title: string
				order: number
			}
		}
	}
}
