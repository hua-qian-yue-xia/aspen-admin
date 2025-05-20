import React from "react"

import { CurdForm } from "@aspen/crud"
import type { FormSchema } from "@aspen/crud"

const schema: FormSchema = {
	username: {
		title: "用户名",
		required: true,
		component: "input-default",
	},
	password: {
		title: "密码",
		required: true,
		component: "input-password",
	},
}

const FormExamplePage: React.FC = () => {
	return (
		<div>
			<CurdForm formConfig={{ labelWidth: 120 }} schema={schema} />
		</div>
	)
}

export default FormExamplePage
