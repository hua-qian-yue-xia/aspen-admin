import { createBrowserRouter } from "react-router-dom"

import { baseRouters } from "./module/base.ts"
import { dynamicRouters } from "./module/dynamic.ts"

export const routerList = createBrowserRouter([
  ...baseRouters,
  ...dynamicRouters,
])
