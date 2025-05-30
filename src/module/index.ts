/*start *********************************** router ***********************************start*/

import { RouterProvider, useRouter } from "./router/router-context"
import { useRoute } from "./router/route-context"
import * as routerShared from "./router/shared/router-dispose"

export const router = { RouterProvider, useRouter, useRoute, routerShared }

/*end************************************** router *************************************end*/

/*start *********************************** store ***********************************start*/

import * as settingStore from "./store/module/setting/setting-store"
import * as tabStore from "./store/module/tab/tab-store"
import * as themeStore from "./store/module/theme/theme-store"
import * as userStore from "./store/module/user/user-store"

export const store = {
	settingStore,
	tabStore,
	themeStore,
	userStore,
}

/*end************************************** store *************************************end*/

/*start *********************************** components ***********************************start*/

import DarkModeContainer from "./components/common/dark-mode-container"

import ButtonIcon from "./components/custom/button-icon"
import SvgIcon from "./components/custom/svg-icon"

import GlobalLogo from "./components/global/global-logo"

import ThemeSegmented from "./components/theme/theme-segmented"

export const components = {
	common: { DarkModeContainer },
	custom: { ButtonIcon, SvgIcon },
	global: { GlobalLogo },
	theme: { ThemeSegmented },
}

/*end************************************** components *************************************end*/

/*start *********************************** context ***********************************start*/

import GlobalAntdProvider from "./context/antd/antd-context"
export const context = { antd: { GlobalAntdProvider } }

/*end************************************** context *************************************end*/
