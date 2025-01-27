import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type ThemeStore = {
	themeMode: string
}

const themeStore = create<ThemeStore>()(
	immer(
		devtools(
			persist(
				() => {
					return {
						themeMode: "",
					}
				},
				{ name: "SYS-STORE" },
			),
		),
	),
)

export const changeThemeMode = () => {
	themeStore.setState((state) => {
		state.themeMode = state.themeMode === "dark" ? "light" : "dark"
	})
}
