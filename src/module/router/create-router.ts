import { createContext } from "react"
import { createBrowserRouter, RouterNavigateOptions, To } from "react-router-dom"

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

	async function navigate(path: To | null, options?: RouterNavigateOptions) {
		reactRouter.navigate(path, options)
	}

	function back() {
		reactRouter.navigate(-1)
	}

	function reload() {
		reactRouter.navigate(0)
	}

	function goHome() {
		reactRouter.navigate("/")
	}

	function replace(path: To) {
		reactRouter.navigate(path, { replace: true })
	}

	return {
		reactRouter,
		navigate,
		back,
		reload,
		goHome,
		replace,
	}
}

export const router = navigator()

export type RouterContextType = Awaited<ReturnType<typeof navigator>>

export const RouterContext = createContext<RouterContextType | null>(null)
