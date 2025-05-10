import { RouteObject } from "react-router-dom"

import DefaultLayout from "@@/layout/default-layout"
import LoginPage from "@/view/sys/login"
import UserCenterPage from "@/view/sys/user-center"
import PasswordLoginPage from "@/view/sys/login/router/password-login"

// 错误页面路由
const errorRoute: Array<RouteObject> = []

// 其他路由
const otherRoute: Array<RouteObject> = [
	{
		path: "/login",
		element: <LoginPage />,
		children: [
			{
				path: "",
				element: <PasswordLoginPage />,
			},
		],
	},
	{
		path: "/user-center",
		children: [],
		element: <UserCenterPage />,
	},
]

// 示例路由
const exampleRoute: Array<RouteObject> = [
	{
		path: "/form",
		children: [],
		element: <div>示例</div>,
	},
	{
		path: "/table",
		children: [],
		element: <div>示例</div>,
	},
	{
		path: "/dialog",
		children: [],
		element: <div>示例</div>,
	},
]

// 根路由
const rootRoute: Array<RouteObject> = [
	{
		path: "/",
		children: [...exampleRoute],
		element: <DefaultLayout />,
	},
]

export const defaultRoutes: Array<RouteObject> = [...rootRoute, ...errorRoute, ...otherRoute]
