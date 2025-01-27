import { createBrowserRouter } from "react-router-dom"

export const createRouter = () => {
	const router = createBrowserRouter([], { basename: "/" })
	router.dispose()

	router.getBlocker("beforeGuard", onBeforeRouter)

	function onBeforeRouter() {
		return true
	}

	return { router }
}
