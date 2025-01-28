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
	 */
	readonly localIcon?: string
}

const SvgIcon: React.FC<Props> = (props) => {
	const { icon, localIcon, ...rest } = props
	return _.isEmpty(localIcon) ? (
		<Icon icon={icon} {...rest} />
	) : (
		<svg height="1em" width="1em" {...rest} aria-hidden="true">
			<use fill="currentColor" href={localIcon} />
		</svg>
	)
}

export default SvgIcon
