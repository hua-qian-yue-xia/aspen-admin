import React from "react"

import { Button, Form, Input } from "antd"

type FormEntity = {
	username: string
	password: string
}

const PasswordLoginPage: React.FC = () => {
	const [form] = Form.useForm<FormEntity>()

	return (
		<div>
			<h3 className="text-18px font-medium">账号密码登录</h3>
			<Form className="pt-24px" form={form}>
				<Form.Item label="用户名" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
					<Input />
				</Form.Item>
				<Form.Item label="密码" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
					<Input.Password />
				</Form.Item>
				<Form.Item label={null}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default PasswordLoginPage
