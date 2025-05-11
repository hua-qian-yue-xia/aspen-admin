import type { ISchema } from "@formily/react"

import type { ComponentType, ComponentPropsObj } from "./dispose-componse/index"

export type FormSchema = Array<FormItemProps<ComponentType>>

export type FormProps = {
	schema: FormSchema
}

export type FormItemProps<T extends ComponentType = ComponentType> = {
	/**
	 * 键
	 */
	key: string
	/**
	 * form-item标题
	 */
	title: string
	/**
	 * 值
	 * @default null
	 */
	value?: any
	/**
	 * 是否必填
	 * @default false
	 */
	required?: boolean
	/**
	 * 组件
	 */
	component: T
	/**
	 * 组件props
	 */
	props?: ComponentPropsObj[T]
}

export const getFormilySchema = (props: FormProps): ISchema => {
	const { schema } = props
	let properties = {}
	if (schema.length) properties = disposeSchema(schema)
	return {
		type: "object",
		properties: properties,
	}
}

const disposeSchema = (schema: Array<FormItemProps>): ISchema["properties"] => {
	const properties: ISchema["properties"] = {}
	for (let i = 0; i < schema.length; i++) {
		const v = schema[i]
		properties[v.key] = {
			type: "string",
			title: v.title,
			required: v.required ?? false,
			"x-decorator": "FormItem",
			"x-component": v.component,
		}
	}
	return properties
}
