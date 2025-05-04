import { RouteObject } from "react-router-dom"

import DefaultLayout from "@@/layout/default-layout"
import LoginPage from "@/view/sys/login"
import UserCenterPage from "@/view/sys/user-center"

const rootRoute: Array<RouteObject> = [
	{
		path: "/",
		children: [],
		element: <DefaultLayout />,
	},
]

const errorRoute: Array<RouteObject> = []

const otherRoute: Array<RouteObject> = [
	{
		path: "/login",
		children: [],
		element: <LoginPage />,
	},
	{
		path: "/user-center",
		children: [],
		element: <UserCenterPage />,
	},
]

export const defaultRoutes: Array<RouteObject> = [...rootRoute, ...errorRoute, ...otherRoute]
