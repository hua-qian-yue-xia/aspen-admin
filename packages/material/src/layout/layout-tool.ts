import { Props } from "./layout-props"

type LayoutPropsCssOption = Required<
	Pick<Props, "maxZIndex" | "headerHeight" | "tabHeight" | "asideWidth" | "asideCollapseWidth" | "footerHeight">
>

export const createLayoutVarCss = (props: LayoutPropsCssOption): Record<string, string> => {
	const maxZIndex = props.maxZIndex ?? 1000

	const headerZIndex = maxZIndex - 30
	const tabZIndex = maxZIndex - 50
	const siderZIndex = maxZIndex - 40
	const mobileSiderZIndex = 0
	const footerZIndex = maxZIndex - 50

	return {
		"--aspen-layout-header-height": `${props.headerHeight}px`,
		"--aspen-layout-header-z-index": `${headerZIndex}`,
		"--aspen-layout-tab-height": `${props.tabHeight}px`,
		"--aspen-layout-tab-z-index": `${tabZIndex}`,
		"--aspen-layout-aside-width": `${props.asideWidth}px`,
		"--aspen-layout-aside-collapse-width": `${props.asideCollapseWidth}px`,
		"--aspen-layout-aside-z-index": `${siderZIndex}`,
		"--aspen-layout-mobile-aside-z-index": `${mobileSiderZIndex}`,
		"--aspen-layout-footer-height": `${props.footerHeight}px`,
		"--aspen-layout-footer-z-index": `${footerZIndex}`,
	}
}
