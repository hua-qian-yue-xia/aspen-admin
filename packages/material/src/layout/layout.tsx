import { _, mergeClass } from "@aspen/common"

import { defaultProps, Props } from "./layout-props"
import { createLayoutVarCss } from "./layout-tool"
import styles from "./css/index.module.css"

const Layout: React.FC<Props> = (props) => {
	const {
		commonClass,
		headerNode,
		headerVisible,
		headerHeight,
		tabNode,
		tabVisible,
		tabHeight,
		asideNode,
		asideVisible,
		asideCollapse,
		asideWidth,
		asideCollapseWidth,
		mainNode,
		footerNode,
		footerVisible,
		footerHeight,
		maxZIndex,
	} = _.assign(defaultProps, props)

	const varCss = createLayoutVarCss({
		maxZIndex: maxZIndex,
		headerHeight: headerHeight,
		tabHeight: tabHeight,
		asideWidth: asideWidth,
		asideCollapseWidth: asideCollapseWidth,
		footerHeight: footerHeight,
	})

	// show
	const headerShow = useMemo(() => !_.isEmpty(headerNode) && headerVisible, [headerNode, headerVisible])
	const tabShow = useMemo(() => !_.isEmpty(tabNode) && tabVisible, [tabNode, tabVisible])
	const asideShow = useMemo(() => !_.isEmpty(asideNode) && asideVisible, [asideNode, asideVisible])
	const footerShow = useMemo(() => !_.isEmpty(footerNode) && footerVisible, [footerNode, footerVisible])

	// class
	// aside间距
	const asideGapClass = useMemo(
		() => (asideCollapse ? styles["layout-aside-gap_collapse"] : styles["layout-aside-gap"]),
		[asideCollapse],
	)
	// aside宽度
	const asideWidthClass = useMemo(
		() => (asideCollapse ? styles["layout-aside_collapse"] : styles["layout-aside"]),
		[asideCollapse],
	)
	// header class
	const headerClass = useMemo(
		() =>
			mergeClass(styles["layout-header"], commonClass, asideGapClass, "flex-shrink-0 absolute left-0 right-0 top-0"),
		[asideGapClass, commonClass],
	)
	const headerReplaceCalss = useMemo(
		() => mergeClass(styles["layout-header-placement"], asideGapClass, "flex-shrink-0"),
		[asideGapClass, commonClass],
	)
	// table class
	const tabClass = useMemo(
		() => mergeClass(styles["layout-tab"], commonClass, asideGapClass, "flex-shrink-0 absolute left-0 right-0"),
		[asideGapClass, commonClass],
	)
	const tabReplaceCalss = useMemo(
		() => mergeClass(styles["layout-tab-placement"], asideGapClass, "flex-shrink-0"),
		[asideGapClass],
	)
	// aside class
	const asideClass = useMemo(
		() => mergeClass(commonClass, asideWidthClass, "absolute left-0 top-0 bottom-0"),
		[asideWidthClass, commonClass],
	)
	// main class
	const mainClass = useMemo(
		() => mergeClass(styles["layout-main"], commonClass, asideGapClass, "flex-col flex-grow"),
		[asideGapClass, commonClass],
	)
	// footer class
	const footerClass = useMemo(
		() =>
			mergeClass(
				styles["layout-footer"],
				commonClass,
				asideGapClass,
				"flex-shrink-0 absolute bottom-0 left-0 right-0 h-full",
			),
		[asideGapClass, commonClass],
	)
	const fotterReplaceCalss = useMemo(
		() => mergeClass(styles["layout-footer"], asideGapClass, "flex-shrink-0 h-full"),
		[asideGapClass],
	)

	// style
	const headerStyle = useMemo(() => ({}), [])
	const tabStyle = useMemo(() => ({}), [])
	const asideStyle = useMemo(() => ({}), [])
	const mainStyle = useMemo(() => ({}), [])
	const footerStyle = useMemo(() => ({}), [])

	return (
		<section style={varCss} className={mergeClass("relative full flex-col", commonClass)}>
			{headerShow && (
				<>
					<header style={headerStyle} className={headerClass}>
						{headerNode}
					</header>
					<div className={headerReplaceCalss} />
				</>
			)}
			{tabShow && (
				<>
					<div style={tabStyle} className={tabClass}>
						{tabNode}
					</div>
					<div className={tabReplaceCalss} />
				</>
			)}
			{asideShow && (
				<aside style={asideStyle} className={asideClass}>
					{asideNode}
				</aside>
			)}
			<main style={mainStyle} className={mainClass}>
				{mainNode}
			</main>
			{footerShow && (
				<>
					<footer style={footerStyle} className={footerClass}>
						{footerNode}
					</footer>
					<div className={fotterReplaceCalss} />
				</>
			)}
		</section>
	)
}

export default Layout
