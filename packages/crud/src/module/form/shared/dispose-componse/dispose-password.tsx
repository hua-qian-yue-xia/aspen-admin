import type { InputProps } from "antd"

import { CurdCompose } from "./base"

export interface CrudPassword extends InputProps {
	key: "Password"
}

export class CurdPasswordComponents extends CurdCompose<CrudPassword> {
	static override key = "Password"
	override transform(props: CrudPassword) {
		return { ...props, type: "password" }
	}
}
