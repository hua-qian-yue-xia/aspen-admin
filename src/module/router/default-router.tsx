import { RouteObject } from "react-router-dom"

import DefaultLayout from "@@/layout/default-layout"

const rootRoute: Array<RouteObject> = [
	{
		path: "/",
		children: [],
		element: <DefaultLayout />,
	},
]

export const defaultRoutes: Array<RouteObject> = [...rootRoute]
