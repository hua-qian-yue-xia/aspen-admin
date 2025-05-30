import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type TabStore = {
	tabs: Array<SysKey.Tab.TabObj>
}

const defaultTabStore = (): TabStore => {
	return {
		tabs: [],
	}
}

const defaultSettingStore = (): TabStore => defaultTabStore()

export const store = create<TabStore>()(immer(devtools(persist(() => defaultSettingStore(), { name: "SYS-TAB" }))))

// 添加tab
export const addTab = (tab: SysKey.Tab.TabObj) => {
	store.setState((state) => {
		const isExist = state.tabs.some((v) => v.uniqueCode === tab.uniqueCode)
		if (isExist) {
			return
		}
		state.tabs = [...state.tabs, tab]
	})
}
