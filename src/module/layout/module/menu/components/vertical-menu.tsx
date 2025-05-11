import { Menu } from "antd"
import type { MenuProps } from "antd"

import { useMenuContext } from "../context/menu-context"

import material from "@aspen/material"

import { store, router } from "@@/index"

const VerticalMenu: React.FC = memo(() => {
	const { themeStore } = store
	const { useRouter } = router

	const { aside } = themeStore.store((store) => store)

	const { menuList } = useMenuContext()
	const { navigate } = useRouter()

	// 被选中时调用
	const doSelect: MenuProps["onSelect"] = (info) => {
		navigate(info.key)
	}

	return (
		<material.SimpleScrollbar>
			<Menu
				className="full border-0! transition-all-300"
				items={menuList}
				inlineCollapsed={aside.collapsed}
				mode="inline"
				inlineIndent={18}
				onSelect={doSelect}
			/>
		</material.SimpleScrollbar>
	)
})

export default VerticalMenu
