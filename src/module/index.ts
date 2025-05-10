/*start *********************************** router ***********************************start*/

import { RouterProvider, useRouter } from "./router/router-provider"

export const router = { RouterProvider, useRouter }

/*end************************************** router *************************************end*/

/*start *********************************** store ***********************************start*/

import * as settingStore from "./store/module/setting/setting-store"
import * as themeStore from "./store/module/theme/theme-store"
import * as userStore from "./store/module/user/user-store"

export const store = {
	settingStore,
	themeStore,
	userStore,
}

/*end************************************** store *************************************end*/

/*start *********************************** components ***********************************start*/

import DarkModeContainer from "./components/common/dark-mode-container"

import ButtonIcon from "./components/custom/button-icon"
import SvgIcon from "./components/custom/svg-icon"

import GlobalLogo from "./components/global/global-logo"

export const components = { common: { DarkModeContainer }, custom: { ButtonIcon, SvgIcon }, global: { GlobalLogo } }

/*end************************************** components *************************************end*/
