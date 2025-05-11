import React from "react"

import { CurdForm } from "@aspen/crud"
import type { FormSchema } from "@aspen/crud"

const schema: FormSchema = [
	{
		key: "username",
		title: "用户名",
		required: true,
		component: "Input",
	},
	{
		key: "password",
		title: "密码",
		required: true,
		component: "Password",
	},
]

const FormExamplePage: React.FC = () => {
	return (
		<div>
			<CurdForm formConfig={{ labelWidth: 120 }} schema={schema} />
		</div>
	)
}

export default FormExamplePage
