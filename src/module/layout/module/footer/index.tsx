import React, { memo } from "react"

import material from "@aspen/material"

import { store, router } from "@@/index"

import { useTabListren, useTab } from "./hooks/tab-hook"

const GlobalFooter: React.FC = memo(() => {
	// 监听tab变化
	useTabListren()
	const { tabs } = useTab()
	const { tabStore, themeStore } = store

	const { activeTabUniqueCode } = tabStore.store((state) => state)
	const { theme } = themeStore.store((state) => state)
	const { useRouter, useRoute } = router

	const { navigate } = useRouter()
	const { pathname } = useRoute()

	// 关闭tab
	const doClose = (uniqueCode: string) => {
		tabStore.closeTab(uniqueCode)
		// 如果关闭的是最后一个tab,且是激活的tab,则激活上一个tab
		const targetIndex = tabs.findIndex((v) => v.uniqueCode === uniqueCode)
		if (targetIndex === tabs.length - 1 && activeTabUniqueCode === uniqueCode) {
			const targetRoute = tabs[targetIndex - 1]
			tabStore.activeTab(targetRoute.uniqueCode)
			navigate(targetRoute.uniqueCode)
		}
	}

	// 激活tab
	const doActive = (uniqueCode: string) => {
		if (pathname == uniqueCode) return
		tabStore.activeTab(uniqueCode)
		navigate(uniqueCode)
	}

	return (
		<div className="flex-row gap-12px">
			{tabs.map((v) => {
				return (
					<material.TabPanel
						key={v.uniqueCode}
						uniqueCode={v.uniqueCode}
						primaryColor={theme.colors.primary}
						isDark={theme.isDark}
						active={v.uniqueCode == activeTabUniqueCode}
						onClose={doClose}
						onActive={doActive}
					>
						{v.title}
					</material.TabPanel>
				)
			})}
		</div>
	)
})

export default GlobalFooter
