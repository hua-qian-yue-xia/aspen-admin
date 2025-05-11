import type { InputProps } from "antd"

import { CurdCompose } from "./base"

export interface CurdInput extends InputProps {
	key: "Input"
}

export class CurdInputComponents extends CurdCompose<CurdInput> {
	override transform(props: CurdInput) {
		return props
	}
}
