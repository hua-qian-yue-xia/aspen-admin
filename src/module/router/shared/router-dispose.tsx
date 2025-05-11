import { components } from "@@/index"

import { exampleRoute } from "../default-router"

export const parseMenus = (): Array<SysKey.Menu.MenuItem> => {
	const routers = [...exampleRoute]
	const menuList = deepPaseRouter(routers)
	return menuList
}

const deepPaseRouter = (routes: Array<SysKey.Route.RouteItem>): Array<SysKey.Menu.MenuItem> => {
	const { custom } = components
	const res: Array<SysKey.Menu.MenuItem> = []
	// 先根据 handle?.order 对路由做倒序排序
	const sortedRoutes = sortRoutesByOrder(routes)
	for (let i = 0; i < sortedRoutes.length; i++) {
		const v = sortedRoutes[i]
		const { icon, title } = v.handle
		const iconNode = icon ? <custom.SvgIcon icon={icon} /> : null
		const children = v.children?.length ? deepPaseRouter((v.children as Array<SysKey.Route.RouteItem>) ?? []) : null
		res.push({
			key: v.path,
			label: title,
			icon: iconNode,
			children: children,
		})
	}
	return res
}

// 根据handle?.order对路由做倒序排序
const sortRoutesByOrder = (routes: Array<SysKey.Route.RouteItem>): Array<SysKey.Route.RouteItem> => {
	routes.sort((next, prev) => (Number(prev.handle?.order) || 0) - (Number(next.handle?.order) || 0))
	return routes
}
