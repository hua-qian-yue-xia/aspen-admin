import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type UserStore = {
	menu: {
		menuList: Array<any>
	}
}

const defaultUserStore = (): UserStore => {
	return {
		menu: {
			menuList: [],
		},
	}
}

export const store = create<UserStore>()(immer(devtools(persist(() => defaultUserStore(), { name: "USER-STORE" }))))

// 设置菜单列表
export const chnageMenuList = (menuList: Array<any>) => {
	store.setState((state) => {
		state.menu.menuList = menuList
	})
}
