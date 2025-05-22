import React, { createContext, PropsWithChildren, useContext } from "react"
import type { MenuProps } from "antd"

import { router } from "@@/index"

type MenuContextProps = {
	menuList: Array<Required<MenuProps>["items"][number]>
	selectKey: Array<string>
}

const MenuContext = createContext<MenuContextProps>({
	menuList: [],
	selectKey: [],
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
		selectKey: selectKey,
	}
	return <MenuContext.Provider value={menuContext}>{children}</MenuContext.Provider>
}

const getSelectKey = (route: Router.Route): Array<string> => {
	const { hideInMenu } = route.currentMatch.handle
	const name = route.pathname
	if (!hideInMenu) {
		return [name]
	}
	return []
}
