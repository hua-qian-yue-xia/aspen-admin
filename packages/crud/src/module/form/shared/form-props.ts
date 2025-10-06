import type { FormRule, FormInstance } from "antd"

import type { ComponentType, ComponentPropsObj } from "./slot-componse/index"

// crud表单props
export type CrudFormProps = {
	/**
	 * 表单json
	 */
	schema: FormSchema
	/**
	 * 表单配置
	 */
	formConfig?: FormConfig
	viewConfig?: any
}

export type FormSchema = Record<string, FormGroup | FormItem>

// 分组项
export type FormGroup = {
	/**
	 * 分组类型
	 * - group 普通分组
	 * - tab 标签页
	 * - step 步骤条
	 */
	type: "group" | "tab" | "step"
	/**
	 * 分组标题
	 */
	title: string
	/**
	 * 分组配置
	 */
	config?: FormGroupConfig
	/**
	 * 分组内容
	 */
	children: Record<string, FormItem>
}

// FormGroup type 为 `group` 时的配置
export type FormGroupConfig = {
	/**
	 * 分组类型
	 * - object 普通表单
	 * - array 可删减表单
	 * @default object
	 */
	type: "object" | "array"
	/**
	 * 是否显示当前项
	 * @default true
	 */
	visibleItem?: boolean
	/**
	 * 是否展开当前项
	 * @default true
	 */
	expandedItem?: boolean
	/**
	 * 是否显示`删除`按钮
	 * type 为 `array` 时有效
	 * @default false
	 */
	visibleDelete?: boolean
	/**
	 * 是否显示`上移`按钮
	 * type 为 `array` 时有效
	 * @default false
	 */
	visibleUp?: boolean
	/**
	 * 是否显示`下移`按钮
	 * type 为 `array` 时有效
	 * @default false
	 */
	visibleDown?: boolean
}

// 表单项
export type FormItem<T extends ComponentType = ComponentType> = {
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
	 * 栅格占位格数,为0时相当于display:none,最大为24
	 * @default 12
	 */
	span?: number
	/**
	 * 是否必填
	 * @default false
	 * 如果为true，会在form-item标题后面添加*,并且添加校验方式msg为`请(输入|选择)${title}`
	 */
	required?: boolean
	/**
	 * 表单校验规则
	 * 如果required为true且rules为undefined或者null，会自动添加校验方式msg为`请(输入|选择)${title}`
	 * @default undefined
	 */
	rules?: Array<FormRule>
	/**
	 * 组件
	 */
	component: T
	/**
	 * 组件props
	 */
	props?: ComponentPropsObj[T]
}

// 表单项
export type FormArrayItem = FormItem & {
	/**
	 * 表单项key
	 */
	key: string
}

// 表单配置
export type FormConfig = {
	/**
	 * 表单title
	 */
	title?: string
	/**
	 * 表单唯一code,常量
	 */
	uniqueCode?: string
	/**
	 * 表单项label宽度(单位px)
	 * @default 100
	 */
	labelWidth?: number
}

// 表单导航项
export type FormNavItem = Omit<FormGroup, "children"> & { key: string | "default" }

// 表单校验
export type FormInstanceItem = {
	key: string
	formInstance: FormInstance<any>
}
