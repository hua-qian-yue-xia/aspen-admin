import { StateCreator } from "zustand"

export type SysSlice = {
  collapseSide: boolean
  visibleTheme: boolean
  visibleFooter: boolean
}

export const setupSysSlice: StateCreator<SysSlice> = () => {
  return {
    collapseSide: false,
    visibleTheme: true,
    visibleFooter: true,
  }
}
