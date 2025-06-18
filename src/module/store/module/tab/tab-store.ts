import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type TabStore = {
	tabs: Array<SysKey.Tab.TabObj>
	activeTabUniqueCode: string
}

const defaultTabStore = (): TabStore => {
	return {
		tabs: [],
		activeTabUniqueCode: "",
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

// 关闭tab
export const closeTab = (uniqueCode: string) => {
	store.setState((state) => {
		const index = state.tabs.findIndex((v) => v.uniqueCode === uniqueCode)
		if (index === -1) return
		state.tabs.splice(index, 1)
	})
}

// 激活tab
export const activeTab = (uniqueCode: string) => {
	store.setState((state) => {
		if (uniqueCode === state.activeTabUniqueCode) return
		state.activeTabUniqueCode = uniqueCode
	})
}
