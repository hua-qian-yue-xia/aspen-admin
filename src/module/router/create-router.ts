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

	// 跳转页面
	async function navigate(path: To | null, options?: RouterNavigateOptions) {
		reactRouter.navigate(path, options)
	}

	// 返回上一页
	function back() {
		reactRouter.navigate(-1)
	}

	// 重新加载当前路由
	function reload() {
		reactRouter.navigate(0)
	}

	// 跳转到根目录
	function goHome() {
		reactRouter.navigate("/")
	}

	// 替换当前路由
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
