import { useMemo } from "react"
import { useMatches, useLocation, useRouteError } from "react-router-dom"

export const useRoute = <
	T = unknown,
	Q extends Record<string, string> | null = Record<string, string>,
	P extends Record<string, string | Array<string>> = Record<string, string | Array<string>>,
>() => {
	const matches = useMatches() as unknown as Array<Router.Route<T>>
	// 获取当前路由
	const currentMatch = matches.at(-1) as unknown as Router.Route<T>
	// 获取除了根路由之外的所有路由
	const matched = matches.slice(1) as unknown as Router.Route<T>
	const { hash, pathname, search } = useLocation()
	// 获取当前路由的完整路径
	const fullPath = pathname + search + hash
	// 获取当前路由错误
	const error = useRouteError() as Error | null
	return useMemo(() => {
		return {
			matches,
			matched,
			currentMatch,
			fullPath,
			error,
			params: "",
			query: "",
			hash,
			pathname,
		} as unknown as Router.Route<T, Q, P>
	}, [fullPath])
}
