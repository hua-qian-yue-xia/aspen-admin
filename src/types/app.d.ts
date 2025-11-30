declare namespace App {
	type RouteObj = import("react-router-dom").RouteObject & {
		handle?: {
			/**
			 * icon图标
			 */
			icon: string
			/**
			 * 菜单标题
			 */
			title: string
			/**
			 * 菜单排序(倒序)
			 * @default 0
			 */
			order: number
			/**
			 * 内嵌外联地址
			 */
			url?: string
			/**
			 * 是否换成路由
			 * @default false
			 */
			keepAlive?: boolean
			/**
			 * 是否隐藏菜单
			 * @default false
			 */
			hideInMenu?: boolean
		}
		children?: Array<RouteObj>
	}

	type UIMatch<Data = unknown, Handle = unknown> = import("react-router-dom").UIMatch<Data, Handle>

	type Route<
		T = unknown,
		Q extends Record<string, string> | null = Record<string, string>,
		P extends Record<string, string | Array<string>> = Record<string, string | Array<string>>,
	> = {
		error: Error | null
		fullPath: string
		matches: Array<UIMatch<T, App.RouteObj["handle"]>>
		matched: Array<UIMatch<T, App.RouteObj["handle"]>>
		currentMatch: UIMatch<T, App.RouteObj["handle"]>
		query: Q
		params: P
		hash: string
		pathname: string
	}

	type IconProps = {
		className?: string
		style?: React.CSSProperties
		/**
		 * Iconify 图标
		 * @see https://icones.js.org
		 */
		icon?: string
		/**
		 * 本地svg图标
		 */
		localIcon?: string
	}

	type Menu = {
		/**
		 * 子菜单
		 */
		children?: Menu[]
		/**
		 * 菜单图标
		 */
		icon?: React.FunctionComponentElement<IconProps>
		/**
		 * 路由key确保唯一
		 */
		key: string
		/**
		 * 菜单标题
		 */
		label: React.ReactNode
		/**
		 * 菜单标题
		 */
		title?: string
	} & Record<string, any>
}
