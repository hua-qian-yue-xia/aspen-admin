import React, { createContext, PropsWithChildren, useContext } from "react"
import type { MenuProps } from "antd"

import { router } from "@@/index"

type MenuContextProps = {
	menuList: Array<Required<MenuProps>["items"][number]>
}

const MenuContext = createContext<MenuContextProps>({
	menuList: [],
})

export const useMenuContext = () => {
	const context = useContext(MenuContext)
	if (!context) console.error(`当前作用域未注入MenuContext`)
	return context
}

export const MenuProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { routerShared } = router
	const menuList = routerShared.parseMenus()
	const menuContext: MenuContextProps = {
		menuList: menuList,
	}
	return <MenuContext.Provider value={menuContext}>{children}</MenuContext.Provider>
}
