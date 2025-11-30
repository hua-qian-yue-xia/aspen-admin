import { useFullscreen } from "ahooks"

import material from "@aspen/material"

import GlobalFooter from "./module/footer/index"
import GlobalSearch from "./module/global/global-search"
import GlobalThemeSwitch from "./module/global/global-theme-switch"
import GlobalThemeBtn from "./module/global/global-theme-btn"
import GlobalUser from "./module/global/global-user"
import ThemeDrawer from "./module/theme-setting/index"
import GlobalHeader from "./module/header/index"
import GlobalMain from "./module/main/index"

import GlobalMenu from "./module/menu"
import MenuToggler from "./module/menu/components/menu-toggler"

import { MenuProvider } from "./context/menu-context"

import { store, components } from "@@/index"

const LayoutHeader: React.FC<{ isDark: boolean }> = memo(({ isDark }) => {
	const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body)
	return (
		<components.common.DarkModeContainer
			className="full px-3 flex-row items-center justify-between shadow-header"
			isDark={isDark}
		>
			<li className="h-full flex-row-center">
				<MenuToggler />
				<GlobalHeader />
			</li>
			<li className="h-full flex-row-center">
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
})

const LayoutTab: React.FC<{ isDark: boolean }> = ({ isDark }) => {
	const { themeStore } = store
	const { main } = themeStore.store((store) => store)

	return (
		<components.common.DarkModeContainer
			className="full px-4 flex-row items-center justify-between shadow-tab"
			isDark={isDark}
		>
			<li className="h-full flex-row-center">
				<GlobalFooter />
			</li>
			<li className="h-full flex-row-center">
				<components.global.GlobalRefresh loading={main.reload} click={() => themeStore.togglerMainReload()} />
				<components.global.GlobalFullScreen tooltipPlacement="top" />
			</li>
		</components.common.DarkModeContainer>
	)
}

const LayoutAside: React.FC<{ width: number; height: number; siderCollapse: boolean; isDark: boolean }> = ({
	width,
	height,
	siderCollapse,
	isDark,
}) => {
	return (
		<components.common.DarkModeContainer className="full flex-col-center shadow-sider" isDark={isDark}>
			<li className="w-full flex-row-center">
				<components.global.GlobalLogo
					style={{ width: `${width}px`, height: `${height}px` }}
					visibleTitle={!siderCollapse}
				/>
			</li>
			<li className="full flex-grow">
				<GlobalMenu mode="vertical" />
			</li>
		</components.common.DarkModeContainer>
	)
}

const LayoutFooter: React.FC<{ isDark: boolean }> = ({ isDark }) => {
	return (
		<components.common.DarkModeContainer className="full flex-row-center px-16px" isDark={isDark}>
			Copyright MIT © 2025 Aspen
		</components.common.DarkModeContainer>
	)
}

const DefaultLayout = () => {
	const { themeStore } = store
	const { theme, header, tab, footer, aside } = themeStore.store((store) => store)

	const isDark = theme.isDark && false
	return (
		<MenuProvider>
			<material.Layout
				headerNode={<LayoutHeader isDark={isDark} />}
				headerHeight={header.height}
				tabNode={<LayoutTab isDark={isDark} />}
				tabHeight={tab.height}
				mainNode={<GlobalMain />}
				asideNode={
					<LayoutAside width={aside.width} height={header.height} siderCollapse={aside.collapsed} isDark={isDark} />
				}
				asideCollapse={aside.collapsed}
				asideWidth={aside.width}
				asideCollapseWidth={aside.collapsedWidth}
				footerNode={<LayoutFooter isDark={isDark} />}
				footerHeight={footer.height}
			/>
			<ThemeDrawer />
		</MenuProvider>
	)
}

export default DefaultLayout
