import { _, mergeClass } from "@aspen/common"

import { defaultProps, Props } from "./layout-props"
import { createLayoutVarCss } from "./layout-tool"
import styles from "./css/index.module.css"

const Layout: React.FC<Props> = (props) => {
	const {
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
	const asideGapClass = useMemo(
		() => (asideCollapse ? styles["layout-aside-gap_collapse"] : styles["layout-aside-gap"]),
		[asideCollapse],
	)
	const asideWidthClass = useMemo(
		() => (asideCollapse ? styles["layout-aside_collapse"] : styles["layout-aside"]),
		[asideCollapse],
	)

	const headerClass = useMemo(
		() => mergeClass(styles["layout-header"], asideGapClass, "absolute left-0 right-0 top-0 flex-shrink-0 bg-red"),
		[asideGapClass],
	)
	const asideClass = useMemo(
		() => mergeClass(asideWidthClass, "absolute left-0 top-0 bottom-0 bg-amber"),
		[asideWidthClass],
	)
	const mainClass = useMemo(() => mergeClass(styles["layout-main"], "full bg-blue"), [])
	const footerClass = useMemo(
		() => mergeClass(styles["layout-footer"], asideGapClass, "absolute bottom-0 flex-shrink-0 full bg-red"),
		[asideGapClass],
	)

	// style
	const headerStyle = useMemo(() => ({}), [])
	const asideStyle = useMemo(() => ({}), [])
	const mainStyle = useMemo(() => ({}), [])
	const footerStyle = useMemo(() => ({}), [])

	return (
		<section style={varCss} className="full relative">
			{headerShow && (
				<header style={headerStyle} className={headerClass}>
					{headerNode}
				</header>
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
				<footer style={footerStyle} className={footerClass}>
					{footerNode}
				</footer>
			)}
		</section>
	)
}

export default Layout
