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
		asideNode,
		asideVisible,
		asideCollapse,
		asideWidth,
		asideCollapseWidth,
		mainNode,
		footerNode,
		footerVisible,
		footerHeight,
	} = _.assign(defaultProps, props)

	const varCss = createLayoutVarCss({
		headerHeight: headerHeight,
		asideWidth: asideWidth,
		asideCollapseWidth: asideCollapseWidth,
		footerHeight: footerHeight,
	})

	// show
	const headerShow = useMemo(() => !_.isEmpty(headerNode) && headerVisible, [headerNode, headerVisible])
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
		() => mergeClass(styles["layout-header"], asideGapClass, "flex-shrink-0"),
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
		() => mergeClass(styles["layout-footer"], commonClass, asideGapClass, "flex-shrink-0 absolute bottom-0 full"),
		[asideGapClass, commonClass],
	)
	const fotterReplaceCalss = useMemo(
		() => mergeClass(styles["layout-footer"], asideGapClass, "flex-shrink-0 full"),
		[asideGapClass],
	)

	// style
	const headerStyle = useMemo(() => ({}), [])
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
			{asideShow && (
				<aside style={asideStyle} className={asideClass}>
					{asideNode}
				</aside>
			)}
			<main style={mainStyle} className={mainClass}>
				{mainNode}
			</main>
			{footerShow && (
				<span>
					<footer style={footerStyle} className={footerClass}>
						{footerNode}
					</footer>
					<div className={fotterReplaceCalss} />
				</span>
			)}
		</section>
	)
}

export default Layout
