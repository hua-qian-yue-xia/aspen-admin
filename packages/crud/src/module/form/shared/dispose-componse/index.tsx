import { CurdInput } from "./dispose-input"

export type ComponentPropsObj = {
	Input: CurdInput
}

export type ComponentType = keyof ComponentPropsObj
