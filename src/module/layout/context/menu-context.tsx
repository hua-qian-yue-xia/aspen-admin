import React, { createContext, PropsWithChildren, useContext } from "react"

import { router } from "@@/index"

type MenuContextProps = {
	/**
	 * 所有的菜单
	 */
	menuList: Array<App.Menu>
	/**
	 * 选择的菜单key
	 */
	selectKeys: Array<string>
	/**
	 * 当前的路由
	 */
	currentRoute: App.Route
}

const MenuContext = createContext<MenuContextProps>({
	menuList: [],
	selectKeys: [],
	currentRoute: {} as App.Route,
})

export const useMenuContext = () => {
	const context = useContext(MenuContext)
	if (!context) console.error(`当前作用域未注入MenuContext`)
	return context
}

export const MenuProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { routerShared, useRoute } = router
	const route = useRoute()

	const menuList = routerShared.parseMenus()

	const selectKey = getSelectKey(route)

	const menuContext: MenuContextProps = {
		menuList: menuList,
		selectKeys: selectKey,
		currentRoute: route,
	}
	return <MenuContext.Provider value={menuContext}>{children}</MenuContext.Provider>
}

const getSelectKey = (route: App.Route): Array<string> => {
	if (!route.currentMatch.handle) return []
	const { hideInMenu } = route.currentMatch.handle
	const name = route.pathname
	if (!hideInMenu) {
		return [name]
	}
	return []
}
