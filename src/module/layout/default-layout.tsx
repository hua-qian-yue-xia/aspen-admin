import { Outlet } from "react-router-dom"

import { Card } from "antd"

import { useFullscreen } from "ahooks"

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
	const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body)
	return (
		<components.common.DarkModeContainer className="full flex-row items-center justify-between" isDark={isDark}>
			<li className="flex-row-center"></li>
			<li className="flex-row-center">
				<GlobalSearch />
				<components.global.GlobalFullScreen
					tooltipContent={isFullscreen ? "退出全屏" : "全屏"}
					fullScreen={isFullscreen}
					toggle={toggleFullscreen}
				/>
				<GlobalThemeSwitch />
				<GlobalThemeBtn />
				<GlobalUser />
			</li>
		</components.common.DarkModeContainer>
	)
}

const LayoutMain: React.FC = () => {
	return (
		<components.common.DarkModeContainer className="full flex-grow p-12px bg-layout">
			<Card className="full" styles={{ body: { height: "100%" } }}>
				<Outlet />
			</Card>
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
		<components.common.DarkModeContainer className="full px-16px" isDark={isDark}>
			<div className="flex-row items-center flex-nowrap">
				<GlobalFooter />
				<components.global.GlobalRefresh />
				<components.global.GlobalFullScreen />
			</div>
			<div className="flex-row-center">Copyright MIT © 2021 Aspen</div>
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
				mainNode={<LayoutMain />}
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
