import type { InputProps } from "antd"

import { CurdCompose } from "./base"

export interface CurdPassword extends InputProps {
	key: "Input"
}

export class CurdInputComponents extends CurdCompose<CurdPassword> {
	override transform(props: CurdPassword) {
		return props
	}
}
