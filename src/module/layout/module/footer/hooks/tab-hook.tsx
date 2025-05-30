import { useEffect } from "react"

import { store, router } from "@@/index"

const { tabStore } = store
const { useRoute } = router

type UseTabHook = {
	/**
	 * 所有的tab
	 */
	tabs: Array<SysKey.Tab.TabObj>
}

export const useTab = (): UseTabHook => {
	const { tabs } = tabStore.store((state) => state)

	return {
		tabs: tabs,
	}
}

export const useTabListren = (): void => {
	const route = useRoute()

	const addTab = (route: Router.Route) => {
		const currentTab = _transformTabByRoute(route)
		if (!currentTab) return
		// 添加tab
		tabStore.addTab(currentTab)
	}

	useEffect(() => addTab(route), [route.fullPath])
}

const _transformTabByRoute = (route: Router.Route): SysKey.Tab.TabObj | null => {
	const handle = route.currentMatch.handle
	if (!handle) return null
	return {
		uniqueCode: route.fullPath,
		title: handle.title,
		icon: handle.icon,
	}
}
