import React from "react"

import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"

import { mergeClass } from "@aspen/common"

type Props = {
	readonly children: React.ReactNode
	readonly className?: string
}

const SimpleScrollbar: React.FC<Props> = ({ children, className }) => {
	return (
		<div className={mergeClass("full flex-1 overflow-hidden", className)}>
			<SimpleBar className="full">{children}</SimpleBar>
		</div>
	)
}

export default SimpleScrollbar
