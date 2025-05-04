import { RouterProvider as Provider } from "react-router-dom"

import { router, RouterContext } from "./create-router"

export const RouterProvider: React.FC = () => {
	return (
		<RouterContext.Provider value={router}>
			<Provider router={router.reactRouter} />
		</RouterContext.Provider>
	)
}
