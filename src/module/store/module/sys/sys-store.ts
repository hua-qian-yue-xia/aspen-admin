import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type SysStore = {
	asideCollapse: boolean
}

const sysStore = create<SysStore>()(
	immer(
		devtools(
			persist(
				() => {
					return {
						asideCollapse: false,
					}
				},
				{ name: "SYS-STORE" },
			),
		),
	),
)

export const asideCollapse = () => {
	sysStore.setState((state) => {
		state.asideCollapse = !state.asideCollapse
	})
}
