import { components } from "@@/index"

import { exampleRoute } from "../default-router"

export const parseMenus = (): Array<App.Menu> => {
	const routers = [...exampleRoute]
	const menuList = deepPaseRouter(routers)
	return menuList
}

const deepPaseRouter = (routes: Array<App.RouteObj>): Array<App.Menu> => {
	// 递归设置route的handle
	const defaultRoutes = deepSetHandleDefault(routes)
	// 先根据 handle?.order 对路由做倒序排序
	const sortedRoutes = sortRoutesByOrder(defaultRoutes)
	// 遍历路由,生成菜单
	const res: Array<App.Menu> = sortedRoutes.map(createMenuByRoutes)
	return res
}

// 递归设置route的handle
const deepSetHandleDefault = (routes: Array<App.RouteObj>): Array<App.RouteObj> => {
	for (let i = 0; i < routes.length; i++) {
		const v = routes[i]
		if (v.handle == undefined) {
			v.handle = {}
		}
		Object.assign(v.handle, {
			order: 0,
			url: undefined,
			keepAlive: false,
			hideInMenu: false,
		})
		if (v.children?.length) {
			deepSetHandleDefault(v.children)
		}
	}
	return routes
}

// 根据handle?.order对路由做倒序排序
const sortRoutesByOrder = (routes: Array<App.RouteObj>): Array<App.RouteObj> => {
	routes.sort((next, prev) => (Number(prev.handle?.order) || 0) - (Number(next.handle?.order) || 0))
	return routes
}

// 根据路由生成菜单
const createMenuByRoutes = (route: App.RouteObj): App.Menu => {
	const { custom } = components
	const { icon, title } = route.handle
	const iconNode = icon ? <custom.SvgIcon icon={icon} /> : null
	const children = route.children?.length ? deepPaseRouter((route.children as Array<App.RouteObj>) ?? []) : null
	return {
		key: route.path,
		label: title,
		icon: iconNode,
		children: children,
	}
}
