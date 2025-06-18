import React from "react"
import { Form, Row, Col, Flex, Button, Tooltip } from "antd"
import {
	ClearOutlined,
	SaveOutlined,
	CheckOutlined,
	CaretUpOutlined,
	CaretDownOutlined,
	DeleteOutlined,
} from "@ant-design/icons"

import "./index.scss"

import type { CrudFormProps, FormInstanceItem } from "./shared/form-props"
import { getFormSchemaByKey, getNavList, isFormGroupModel } from "./shared/form-transition"

import { switchSlot } from "./shared/slot-componse/index"

import FormNav from "./components/form/form-nav"

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
		<div className="form">
			{visibleNavList && <FormNav list={navList} />}
			<div className="form-container">
				<ul className="form-area">
					{navList.map((item, index) => {
						const { key } = item
						const properties = getFormSchemaByKey(schema, key)
						return (
							<li className="form-group" key={index}>
								<ul className="form-group-title">
									<li>
										<p>{item.title}</p>
									</li>
									<li>
										<Flex gap="middle" justify="center">
											{index !== 0 && (
												<Tooltip placement="top" title={"上移"}>
													<CaretUpOutlined />
												</Tooltip>
											)}
											{navList.length - 1 !== index && (
												<Tooltip placement="top" title={"下移"}>
													<CaretDownOutlined />
												</Tooltip>
											)}
											{index !== 0 && (
												<Tooltip placement="top" title={"删除"}>
													<DeleteOutlined />
												</Tooltip>
											)}
										</Flex>
									</li>
								</ul>
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
							</li>
						)
					})}
				</ul>
			</div>
			<div className="bottom-area">
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
			</div>
		</div>
	)
})

export default CurdForm
