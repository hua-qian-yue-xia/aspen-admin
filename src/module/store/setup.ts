import { create } from "zustand"

import { SysSlice } from "./module/sys/store.ts"

type Store = SysSlice

export const useStore = create<Store>()
