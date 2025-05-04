/*start *********************************** router ***********************************start*/

import { RouterProvider } from "./router/router-provider"

/*end************************************** router *************************************end*/

/*start *********************************** store ***********************************start*/

import * as themeStore from "./store/module/theme/theme-store"

/*end************************************** store *************************************end*/

export const router = { RouterProvider }
export const store = {
	themeStore: themeStore,
}
