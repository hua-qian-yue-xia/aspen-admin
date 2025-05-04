import ButtonIcon from "@/module/components/custom/button-icon"
import SvgIcon from "@/module/components/custom/svg-icon"

import { store } from "@@/index"

type NumberBool = 0 | 1
const icons: Record<NumberBool, Record<NumberBool, string>> = {
	0: {
		0: "line-md:menu-fold-left",
		1: "line-md:menu-fold-right",
	},
	1: {
		0: "ph-caret-double-left-bold",
		1: "ph-caret-double-right-bold",
	},
}

type Props = {
	/**
	 * 是否显示箭头图标
	 * @default false
	 */
	isArrowIcon?: boolean
	className?: string
}

const MenuToggler: React.FC<Props> = ({ isArrowIcon = false, className }) => {
	const { themeStore } = store
	const { aside } = themeStore.store((store) => store)
	const icon = icons[isArrowIcon ? 1 : 0][aside.collapsed ? 1 : 0]
	return (
		<ButtonIcon
			className={className}
			tooltipContent={aside.collapsed ? "折叠菜单" : "展开菜单"}
			tooltipPlacement="bottomLeft"
			onClick={() => themeStore.togglerAsideCollapsed()}
		>
			<SvgIcon icon={icon} />
		</ButtonIcon>
	)
}

export default MenuToggler
