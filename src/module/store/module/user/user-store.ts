import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type UserStore = {
	asideCollapse: boolean
}

const sysStore = create<UserStore>()(
	immer(
		devtools(
			persist(
				() => {
					return {
						asideCollapse: false,
					}
				},
				{ name: "USER-STORE" },
			),
		),
	),
)

export const asideCollapse = () => {
	sysStore.setState((state) => {
		state.asideCollapse = !state.asideCollapse
	})
}
