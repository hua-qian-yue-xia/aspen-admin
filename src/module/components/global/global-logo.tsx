import { Link, LinkProps } from "react-router-dom"

import { store } from "@@/index"

type Props = {
	/**
	 * 是否展示标题
	 * @default true
	 */
	visibleTitle?: boolean
	/**
	 * 是否禁用链接跳转
	 * @default false
	 */
	disableLink?: boolean
} & Omit<LinkProps, "to">

const GlobalLogo: React.FC<Props> = memo(({ visibleTitle = true, disableLink = false, ...res }) => {
	const { settingStore } = store
	const { global } = settingStore.store((store) => store)

	const logoContent = (
		<h2
			className="pl-8px text-16px text-primary font-bold transition duration-300 ease-in-out"
			style={{ display: visibleTitle ? "block" : "none" }}
		>
			{global.sysName}
		</h2>
	)
	if (disableLink) {
		return <div className="full flex-row-center">{logoContent}</div>
	}
	return (
		<Link className="full flex-row-center" to="/" {...res}>
			{logoContent}
		</Link>
	)
})

export default GlobalLogo
