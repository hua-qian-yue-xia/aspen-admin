import type { CSSProperties } from "react"

import { Icon } from "@iconify/react"

import { _ } from "@aspen/common"

type Props = {
	readonly className?: string
	readonly style?: CSSProperties
	/**
	 * Iconify 网络图标
	 * @see https://icones.js.org
	 */
	readonly icon?: string
	/**
	 * 本地图标
	 * @description 当同时传入icon和localIcon时,优先使用localIcon
	 */
	readonly localIcon?: string
}

const defaultLocalIcon = "no-icon"
const { VITE_ICON_LOCAL_PREFIX: prefix } = import.meta.env
const symbolId = (localIcon: string = defaultLocalIcon) => {
	const iconName = localIcon || defaultLocalIcon
	return `#${prefix}-${iconName}`
}

const SvgIcon: React.FC<Props> = (props) => {
	const { icon, localIcon, ...rest } = props
	if (_.isEmpty(localIcon)) {
		return <Icon icon={icon} {...rest} />
	}
	return (
		<svg height="1em" width="1em" {...rest} aria-hidden="true">
			<use fill="currentColor" href={symbolId(localIcon)} />
		</svg>
	)
}

export default SvgIcon
