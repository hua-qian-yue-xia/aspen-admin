import { Menu } from "antd"
import type { MenuProps } from "antd"

import material from "@aspen/material"

import { store, router } from "@@/index"

import { useMenuContext } from "../context/menu-context"

const getSelectedMenuKeyPath = (matches: Router.Route["matches"]): Array<string> => {
	if (!matches.length) return []
	const result = matches.reduce((acc: Array<string>, match, index) => {
		if (index < matches.length - 1 && match.pathname) {
			acc.push(match.pathname)
		}
		return acc
	}, [])
	return result
}

const VerticalMenu: React.FC = memo(() => {
	const { themeStore } = store
	const { useRouter, useRoute } = router

	const { aside } = themeStore.store((store) => store)

	const { menuList, selectKeys } = useMenuContext()
	const { navigate } = useRouter()
	const { matched } = useRoute()

	const [getOpenMenuKeys, setOpenMenuKeys] = useState<Array<string>>(
		aside.collapsed ? [] : getSelectedMenuKeyPath(matched),
	)

	// 被选中时调用
	const doSelect: MenuProps["onSelect"] = (info) => {
		navigate(info.key)
	}

	// 当open被改变时的回调
	const doOpenChange: MenuProps["onOpenChange"] = (keys) => {
		setOpenMenuKeys(keys)
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
				selectedKeys={selectKeys}
				onSelect={doSelect}
				onOpenChange={doOpenChange}
			/>
		</material.SimpleScrollbar>
	)
})

export default VerticalMenu
