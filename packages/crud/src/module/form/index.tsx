import React from "react"
import { Form, Row, Col, Flex, Button } from "antd"
import { ClearOutlined, SaveOutlined, CheckOutlined } from "@ant-design/icons"

import type { CrudFormProps, FormInstanceItem } from "./shared/form-props"
import { getFormSchemaByKey, getNavList, isFormGroupModel } from "./shared/form-transition"

import { switchSlot } from "./shared/slot-componse/index"

import FormGroupOperation from "./components/form/form-group-operation"
import FormNav from "./components/form/form-nav"

import "./index.scss"

const CurdForm: React.FC<CrudFormProps> = memo((props) => {
	const { schema } = props

	// 判断schema是否为group模式
	const isFormGroup = isFormGroupModel(schema)

	const navList = getNavList(schema, isFormGroup)

	const validateList: Array<FormInstanceItem> = navList.map((v) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [form] = Form.useForm()
		return {
			key: v.key,
			formInstance: form,
		}
	})

	const visibleNavList = React.useMemo(() => {
		return isFormGroup
	}, [isFormGroup])

	// 点击`重置`按钮
	const doReset = React.useCallback(() => {
		for (let i = 0; i < validateList.length; i++) {
			const element = validateList[i]
			element.formInstance.resetFields()
		}
	}, [validateList])
	// 点击`保存`按钮
	const doUpdate = React.useCallback(() => {}, [])
	// 点击`提交`按钮
	const doSubmit = React.useCallback(() => {
		for (let i = 0; i < validateList.length; i++) {
			const element = validateList[i]
			element.formInstance
				.validateFields({ validateOnly: false })
				.then((res) => {
					console.log("校验成功:", res)
				})
				.catch((error) => {
					console.log("校验失败:", error)
				})
		}
	}, [validateList])
	return (
		<main className="form">
			{visibleNavList && <FormNav className="form-nav" list={navList} />}
			<section className="form-container">
				<section className="form-area">
					{navList.map((item, index) => {
						const { key } = item
						const properties = getFormSchemaByKey(schema, key)
						console.log("key:", key)
						console.log("schema:", schema)
						return (
							<article className="form-group" key={index}>
								<header className="form-group-title">
									<h3>{item.title}</h3>
									<FormGroupOperation />
									{/* <FormItemOperation
										visibleDelete={index != 0}
										visibleUp={index != 0}
										visibleDown={index != navList.length - 1}
									/> */}
								</header>
								<Form
									className="form-group-container"
									labelCol={{ span: 24 }}
									layout="vertical"
									form={validateList.find((i) => i.key === key).formInstance}
								>
									<Row wrap gutter={12}>
										{properties.map((formItem) => {
											const { component } = formItem
											// 获取当前组件信息
											const slot = switchSlot(component)
											return (
												<Col key={formItem.key} span={formItem.span}>
													<Form.Item name={formItem.key} label={formItem.title} rules={formItem.rules}>
														{slot.render()}
													</Form.Item>
												</Col>
											)
										})}
									</Row>
								</Form>
							</article>
						)
					})}
				</section>
				<footer className="bottom-area">
					<Flex gap="large" justify="center">
						<Button htmlType="reset" icon={<ClearOutlined />} onClick={doReset}>
							重 置
						</Button>
						<Button icon={<SaveOutlined />} type="dashed" onClick={doUpdate}>
							保 存
						</Button>
						<Button htmlType="submit" icon={<CheckOutlined />} type="primary" onClick={doSubmit}>
							提 交
						</Button>
					</Flex>
				</footer>
			</section>
		</main>
	)
})

export default CurdForm
