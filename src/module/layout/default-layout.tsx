import { Outlet } from "react-router-dom"

import material from "@aspen/material"

import GlobalFooter from "./module/footer/index"
import GlobalSearch from "./module/global/global-search"
import GlobalThemeSwitch from "./module/global/global-theme-switch"
import GlobalThemeBtn from "./module/global/global-theme-btn"
import GlobalUser from "./module/global/global-user"
import ThemeDrawer from "./module/theme-setting/index"

import GlobalMenu from "./module/menu"
import MenuToggler from "./module/menu/components/menu-toggler"

import { store, components } from "@@/index"

const LayoutHeader: React.FC<{ isDark: boolean }> = ({ isDark }) => {
	return (
		<components.common.DarkModeContainer className="full flex-row items-center justify-between" isDark={isDark}>
			<li className="flex-row-center"></li>
			<li className="flex-row-center">
				<GlobalSearch />
				<GlobalThemeSwitch />
				<GlobalThemeBtn />
				<GlobalUser />
			</li>
		</components.common.DarkModeContainer>
	)
}

const LayoutMain: React.FC<{ isDark: boolean }> = ({ isDark }) => {
	return (
		<components.common.DarkModeContainer className="full" isDark={isDark}>
			<Outlet />
		</components.common.DarkModeContainer>
	)
}

const LayoutAside: React.FC<{ height: number; isDark: boolean }> = ({ height, isDark }) => {
	return (
		<components.common.DarkModeContainer className="full flex-col-center" isDark={isDark}>
			<li className="w-full flex-row-center">
				<components.global.GlobalLogo style={{ height: `${height}px` }} />
				<MenuToggler />
			</li>
			<li className="full flex-grow">
				<GlobalMenu mode="vertical" />
			</li>
		</components.common.DarkModeContainer>
	)
}

const LayoutFooter: React.FC<{ isDark: boolean }> = ({ isDark }) => {
	return (
		<components.common.DarkModeContainer className="full" isDark={isDark}>
			<GlobalFooter />
		</components.common.DarkModeContainer>
	)
}

const DefaultLayout = () => {
	const { themeStore } = store
	const { theme, header, footer, aside } = themeStore.store((store) => store)

	const isDark = theme.isDark && false
	return (
		<>
			<material.Layout
				headerNode={<LayoutHeader isDark={isDark} />}
				headerHeight={header.height}
				mainNode={<LayoutMain isDark={isDark} />}
				asideNode={<LayoutAside height={header.height} isDark={isDark} />}
				asideCollapse={aside.collapsed}
				asideWidth={aside.width}
				asideCollapseWidth={aside.collapsedWidth}
				footerNode={<LayoutFooter isDark={isDark} />}
				footerHeight={footer.height}
			/>
			<ThemeDrawer />
		</>
	)
}

export default DefaultLayout
