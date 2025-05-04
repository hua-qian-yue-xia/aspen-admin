import { createContext } from "react"
import { createBrowserRouter } from "react-router-dom"

import { defaultRoutes } from "./default-router"

const initRouter = () => {
	const reactRouter = createBrowserRouter(defaultRoutes, {
		basename: "/",
		patchRoutesOnNavigation: (e) => {
			console.log(e)
		},
	})
	return { reactRouter }
}

const navigator = () => {
	const { reactRouter } = initRouter()

	return {
		reactRouter,
	}
}

export const router = navigator()

export const RouterContext = createContext<Awaited<ReturnType<typeof navigator>> | null>(null)
