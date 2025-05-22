import { components } from "@@/index"

import { exampleRoute } from "../default-router"

export const parseMenus = (): Array<SysKey.Menu.MenuItem> => {
	const routers = [...exampleRoute]
	const menuList = deepPaseRouter(routers)
	return menuList
}

const deepPaseRouter = (routes: Array<Router.RouteObj>): Array<SysKey.Menu.MenuItem> => {
	// 先根据 handle?.order 对路由做倒序排序
	const sortedRoutes = sortRoutesByOrder(routes)
	// 遍历路由,生成菜单
	const res: Array<SysKey.Menu.MenuItem> = sortedRoutes.map(createMenuByRoutes)
	return res
}

// 根据handle?.order对路由做倒序排序
const sortRoutesByOrder = (routes: Array<Router.RouteObj>): Array<Router.RouteObj> => {
	routes.sort((next, prev) => (Number(prev.handle?.order) || 0) - (Number(next.handle?.order) || 0))
	return routes
}

// 根据路由生成菜单
const createMenuByRoutes = (route: Router.RouteObj): SysKey.Menu.MenuItem => {
	const { custom } = components
	const { icon, title } = route.handle
	const iconNode = icon ? <custom.SvgIcon icon={icon} /> : null
	const children = route.children?.length ? deepPaseRouter((route.children as Array<Router.RouteObj>) ?? []) : null
	return {
		key: route.path,
		label: title,
		icon: iconNode,
		children: children,
	}
}
