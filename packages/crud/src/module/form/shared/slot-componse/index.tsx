import { CurdSlot } from "./base"

import type { CrudInputDefault, CrudInputPassword } from "./slot-input"
import { CrudInputComponents, CurdPasswordComponents } from "./slot-input"

export type ComponentPropsObj = {
	"input-default": CrudInputDefault
	"input-password": CrudInputPassword
}

export type ComponentType = keyof ComponentPropsObj

export const crudComponentList: Array<CurdSlot<any>> = [new CrudInputComponents(), new CurdPasswordComponents()]

// 根据key获取crud组件
export const switchSlot = (type: ComponentType): CurdSlot | null => {
	const component = crudComponentList.find((item) => item.key === type)
	if (component) {
		return component
	}
	return null
}
