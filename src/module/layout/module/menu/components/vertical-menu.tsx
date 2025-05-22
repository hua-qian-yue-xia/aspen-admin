import { Menu } from "antd"
import type { MenuProps } from "antd"

import { useMenuContext } from "../context/menu-context"

import material from "@aspen/material"

import { store, router } from "@@/index"

const VerticalMenu: React.FC = memo(() => {
	const { themeStore } = store
	const { useRouter, useRoute } = router

	const { aside } = themeStore.store((store) => store)

	const { menuList } = useMenuContext()
	const { navigate } = useRouter()
	const { currentMatch } = useRoute()

	const [getOpenMenuKeys, setOpenMenuKeys] = useState<Array<string>>([])

	// 被选中时调用
	const doSelect: MenuProps["onSelect"] = (info) => {
		navigate(info.key)
	}

	// 当open被改变时的回调
	const doOpenChange: MenuProps["onOpenChange"] = (keys) => {
		console.log("keys:", keys)
		console.log("currentMatch:", currentMatch)

		// 当前打开的菜单key
		const currentOpenKey = keys.find((key) => !getOpenMenuKeys.includes(key))
		console.log("currentOpenKey:", currentOpenKey)
		if (currentOpenKey) {
			setOpenMenuKeys([currentOpenKey])
		}
		// setOpenMenuKeys(keys)
	}

	return (
		<material.SimpleScrollbar>
			<Menu
				className="full border-0! transition-all-300"
				items={menuList}
				inlineCollapsed={aside.collapsed}
				mode="inline"
				inlineIndent={18}
				openKeys={getOpenMenuKeys}
				onSelect={doSelect}
				onOpenChange={doOpenChange}
			/>
		</material.SimpleScrollbar>
	)
})

export default VerticalMenu
