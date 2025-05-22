import React, { createContext, PropsWithChildren, useContext } from "react"
import type { MenuProps } from "antd"

import { router } from "@@/index"

type MenuContextProps = {
	menuList: Array<Required<MenuProps>["items"][number]>
	selectKeys: Array<string>
}

const MenuContext = createContext<MenuContextProps>({
	menuList: [],
	selectKeys: [],
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
	}
	return <MenuContext.Provider value={menuContext}>{children}</MenuContext.Provider>
}

const getSelectKey = (route: Router.Route): Array<string> => {
	if (!route.currentMatch.handle) return []
	const { hideInMenu } = route.currentMatch.handle
	const name = route.pathname
	if (!hideInMenu) {
		return [name]
	}
	return []
}
