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

const GlobalLogo: React.FC<Props> = ({ visibleTitle = true, disableLink = false, ...res }) => {
	const { settingStore, themeStore } = store
	const { global } = settingStore.store((store) => store)
	const { aside } = themeStore.store((store) => store)

	const LogoCmp = () => {
		return (
			<div className="full flex-row-center gap-1">
				<img className="w-24px h-24px" src="/svg/logo.svg" alt={global.sysName} />
				<h2
					className="text-16px text-primary font-bold transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap"
					style={{ maxWidth: visibleTitle ? aside.width : 0, opacity: visibleTitle ? 1 : 0 }}
				>
					{global.sysName}
				</h2>
			</div>
		)
	}
	if (disableLink) return <LogoCmp />
	return (
		<Link className="full flex-row-center" to="/" {...res}>
			<LogoCmp />
		</Link>
	)
}

export default memo(GlobalLogo)
