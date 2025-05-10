import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type UserStore = {
	asideCollapse: boolean
}

const defaultUserStore = (): UserStore => {
	return {
		asideCollapse: false,
	}
}

const store = create<UserStore>()(immer(devtools(persist(() => defaultUserStore(), { name: "USER-STORE" }))))

export const asideCollapse = () => {
	store.setState((state) => {
		state.asideCollapse = !state.asideCollapse
	})
}
