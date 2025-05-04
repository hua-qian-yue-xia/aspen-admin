import { useContext } from "react"
import { RouterProvider as Provider } from "react-router-dom"

import { router, RouterContext } from "./create-router"
import type { RouterContextType } from "./create-router"

export const RouterProvider: React.FC = () => {
	return (
		<RouterContext.Provider value={router}>
			<Provider router={router.reactRouter} />
		</RouterContext.Provider>
	)
}

export function useRouter(): RouterContextType {
	const navigator = useContext(RouterContext)
	if (!navigator) {
		throw new Error("未注入RouterContext")
	}
	return navigator
}
