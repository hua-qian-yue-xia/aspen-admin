import type { FormRule } from "antd"

export const formValidator = (): Record<string, FormRule> => {
	return {
		userName: {},
	}
}
