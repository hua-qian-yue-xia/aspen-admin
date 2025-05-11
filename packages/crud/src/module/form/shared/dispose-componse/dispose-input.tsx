import type { InputProps } from "antd"

import { CurdCompose } from "./base"

export interface CrudInput extends InputProps {
	key: "Input"
}

export class CrudInputComponents extends CurdCompose<CrudInput> {
	static override key = "Input"
	override transform(props: CrudInput) {
		return props
	}
}
