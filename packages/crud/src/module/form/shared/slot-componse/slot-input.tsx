import { Input } from "antd"
import type { InputProps } from "antd"

import { _ } from "@aspen/common"

import { CurdSlot } from "./base"

/*start *********************************** 输入框-普通 ***********************************start*/

export interface CrudInputDefault extends InputProps {
	key: "input-default"
}

export class CrudInputComponents extends CurdSlot<CrudInputDefault> {
	override key = "input-default"
	override transformProps() {
		return this.props
	}
	override render() {
		return <Input {...(this.props as any)}></Input>
	}
}

/*end************************************** 输入框-普通 *************************************end*/

/*start *********************************** 输入框-密码 ***********************************start*/

export interface CrudInputPassword extends InputProps {
	key: "input-password"
}

export class CurdPasswordComponents extends CurdSlot<CrudInputPassword> {
	override key = "input-password"
	override transformProps() {
		return _.assign(this.props, { key: "input-password", type: "password" })
	}
	override render() {
		return <Input.Password {...(this.props as any)}></Input.Password>
	}
}

/*end************************************** 输入框-密码 *************************************end*/
