import { Props } from "./layout-props"

type LayoutPropsCssOption = Required<Pick<Props, "headerHeight" | "asideWidth" | "asideCollapseWidth" | "footerHeight">>

export const createLayoutVarCss = (props: LayoutPropsCssOption): Record<string, string> => {
	return {
		"--aspen-layout-header-height": `${props.headerHeight}px`,
		"--aspen-layout-aside-width": `${props.asideWidth}px`,
		"--aspen-layout-aside-collapse-width": `${props.asideCollapseWidth}px`,
		"--aspen-layout-footer-height": `${props.footerHeight}px`,
	}
}
