import React from "react"

import { Form } from "antd"

type FormEntity = {
	username: string
	password: string
}

const PasswordLoginPage: React.FC = () => {
	const [form] = Form.useForm<FormEntity>()

	return (
		<div>
			<h3 className="text-18px font-medium">账号密码登录</h3>
			<Form className="pt-24px" form={form}></Form>
		</div>
	)
}

export default PasswordLoginPage
