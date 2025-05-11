import React from "react"

import VerticalMenu from "./components/vertical-menu"

import { MenuProvider } from "./context/menu-context"

type Props = {
	mode: SysKey.Menu.LayoutMode
}

const GlobalMenu: React.FC<Props> = ({ mode }) => {
	if (mode === "vertical") {
		return (
			<MenuProvider>
				<VerticalMenu />
			</MenuProvider>
		)
	}
	return (
		<MenuProvider>
			<VerticalMenu />
		</MenuProvider>
	)
}

export default GlobalMenu
