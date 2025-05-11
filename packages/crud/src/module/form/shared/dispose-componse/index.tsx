import { CrudInput } from "./dispose-input"
import { CrudPassword } from "./dispose-password"

export type ComponentPropsObj = {
	Input: CrudInput
	Password: CrudPassword
}

export type ComponentType = keyof ComponentPropsObj
