/*start *********************************** router ***********************************start*/

import { RouterProvider, useRouter } from "./router/router-provider"

/*end************************************** router *************************************end*/

/*start *********************************** store ***********************************start*/

import * as themeStore from "./store/module/theme/theme-store"

/*end************************************** store *************************************end*/

export const router = { RouterProvider, useRouter }
export const store = {
	themeStore: themeStore,
}
