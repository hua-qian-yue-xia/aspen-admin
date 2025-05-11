import { Outlet } from "react-router-dom"

import material from "@aspen/material"

import GlobalSearch from "./module/global/global-search"
import GlobalThemeSwitch from "./module/global/global-theme-switch"
import GlobalThemeBtn from "./module/global/global-theme-btn"
import GlobalUser from "./module/global/global-user"
import ThemeDrawer from "./module/theme-setting/index"

import GlobalMenu from "./module/menu"
import MenuToggler from "./module/menu/components/menu-toggler"

import { store, components } from "@@/index"

const LayoutHeader: React.FC = () => {
	return (
		<ul className="full flex-row items-center justify-between">
			<li className="flex-row-center"></li>
			<li className="flex-row-center">
				<GlobalSearch />
				<GlobalThemeSwitch />
				<GlobalThemeBtn />
				<GlobalUser />
			</li>
		</ul>
	)
}

const LayoutMain: React.FC = () => {
	return (
		<div className="full">
			<Outlet />
		</div>
	)
}

const LayoutAside: React.FC<{ height: number }> = ({ height }) => {
	const { global } = components
	return (
		<ul className="full flex-col-center">
			<li className="w-full flex-row-center">
				<global.GlobalLogo style={{ height: `${height}px` }} />
				<MenuToggler />
			</li>
			<li className="full flex-grow">
				<GlobalMenu mode="vertical" />
			</li>
		</ul>
	)
}

const LayoutFooter: React.FC = () => {
	return <div>底部区域</div>
}

const DefaultLayout = () => {
	const { themeStore } = store
	const { header, footer, aside } = themeStore.store((store) => store)
	return (
		<>
			<material.Layout
				headerNode={<LayoutHeader />}
				headerHeight={header.height}
				mainNode={<LayoutMain />}
				asideNode={<LayoutAside height={header.height} />}
				asideCollapse={aside.collapsed}
				asideWidth={aside.width}
				asideCollapseWidth={aside.collapsedWidth}
				footerNode={<LayoutFooter />}
				footerHeight={footer.height}
			/>
			<ThemeDrawer />
		</>
	)
}

export default DefaultLayout
