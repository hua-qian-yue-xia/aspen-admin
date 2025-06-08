import React from "react"

import { CurdForm } from "@aspen/crud"
import type { FormSchema, FormConfig } from "@aspen/crud"

const schema: FormSchema = {
	user: {
		type: "group",
		title: "用户信息",
		children: {
			username: {
				title: "用户名",
				required: true,
				span: 12,
				component: "input-default",
			},
			password: {
				title: "密码",
				required: true,
				span: 12,
				component: "input-password",
			},
		},
	},
}

const formConfig: FormConfig = {
	labelWidth: 120,
}

const FormExamplePage: React.FC = () => {
	return (
		<div className="full flex-row justify-center">
			<div className="w-80%">
				<CurdForm formConfig={formConfig} schema={schema} />
			</div>
		</div>
	)
}

export default FormExamplePage
