import React from "react"

import VerticalMenu from "./components/vertical-menu"

type Props = {
	mode: SysKey.Menu["layoutMode"]
}

const GlobalMenu: React.FC<Props> = ({ mode }) => {
	if (mode === "vertical") {
		return <VerticalMenu />
	}
	return <VerticalMenu />
}

export default GlobalMenu
