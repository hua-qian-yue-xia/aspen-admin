import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type SettingStore = {
	global: {
		sysName: string
	}
}

const defaultSettingStore = (): SettingStore => {
	return {
		global: {
			sysName: "Aspen管理系统",
		},
	}
}

export const store = create<SettingStore>()(
	immer(devtools(persist(() => defaultSettingStore(), { name: "SYS-SETTING" }))),
)
