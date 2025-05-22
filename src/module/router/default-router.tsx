import { RouteObject } from "react-router-dom"

const disposePathComponent = (pathComponent: any) => {
	const { default: Component } = pathComponent
	if (!Component) console.error(`路由配置错误:${pathComponent}组件不存在`)
	return { Component }
}

// 错误页面路由
const errorRoute: Array<Router.RouteObj> = []

// 其他路由
const otherRoute: Array<Router.RouteObj> = [
	{
		path: "/login",
		lazy: () => import("@/view/sys/login").then(disposePathComponent),
		handle: {
			icon: "fluent:book-information-24-regular",
			title: "登录",
			order: 1,
		},
		children: [
			{
				path: "",
				lazy: () => import("@/view/sys/login/router/password-login").then(disposePathComponent),
			},
		],
	},
	{
		path: "/user-center",
		lazy: () => import("@/view/sys/user-center").then(disposePathComponent),
		handle: {
			icon: "fluent:book-information-24-regular",
			title: "个人中心",
			order: 1,
		},
		children: [],
	},
]

// 示例路由
export const exampleRoute: Array<Router.RouteObj> = [
	{
		path: "/example",
		handle: {
			icon: "fluent:book-information-24-regular",
			title: "示例",
			order: 5,
		},
		children: [
			{
				path: "/example/form",
				lazy: () => import("@/view/example/form/index").then(disposePathComponent),
				handle: {
					icon: "fluent:book-information-24-regular",
					title: "表单示例",
					order: 100,
				},
				children: [],
			},
			{
				path: "/example/table",
				lazy: () => import("@/view/example/table/index").then(disposePathComponent),
				handle: {
					icon: "fluent:book-information-24-regular",
					title: "表格示例",
					order: 90,
				},
				children: [],
			},
			{
				path: "/example/dialog",
				lazy: () => import("@/view/example/dialog/index").then(disposePathComponent),
				handle: {
					icon: "fluent:book-information-24-regular",
					title: "弹框示例",
					order: 80,
				},
				children: [],
			},
		],
	},
]

// 根路由
const rootRoute: Array<RouteObject> = [
	{
		path: "/",
		lazy: () => import("@@/layout/default-layout").then(disposePathComponent),
		children: [...exampleRoute],
	},
]

export const defaultRoutes: Array<RouteObject> = [...rootRoute, ...errorRoute, ...otherRoute]
