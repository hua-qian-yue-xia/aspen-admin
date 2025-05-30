import enUS from "antd/es/locale/en_US"
import zhCN from "antd/es/locale/zh_CN"
import type { Locale } from "antd/lib/locale"

import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type LangStore = {
	localeList: Array<Lang.LangObj>
	antdLocaleList: Record<Lang.LangMode, Locale>
	locale: Lang.LangMode
}

const defaultLangStore = (): LangStore => {
	return {
		localeList: [
			{
				mode: "zh-CN",
				label: "中文",
			},
			{
				mode: "en-US",
				label: "English",
			},
		],
		antdLocaleList: {
			"en-US": enUS,
			"zh-CN": zhCN,
		},
		locale: "zh-CN",
	}
}

export const store = create<LangStore>()(immer(devtools(persist(() => defaultLangStore(), { name: "SYS-SETTING" }))))
