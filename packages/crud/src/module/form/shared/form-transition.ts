import type { FormSchema, FormGroup, FormItem, FormArrayItem, FormNavItem } from "./form-props"

// 判断是否为FormGroupProps类型
const isFormGroupProps = (props: FormGroup | FormItem): props is FormGroup => {
	return (props as FormGroup).type !== undefined
}

// 判断schema是否为group模式
export const isFormGroupModel = (schema: FormSchema): boolean => {
	let isFormGroup = false
	for (const key in schema) {
		if (isFormGroupProps(schema[key])) {
			isFormGroup = true
			break
		}
	}
	return isFormGroup
}

// 根据key获取schema
export const getFormSchemaByKey = (schema: FormSchema, groupKey: string | "default"): Array<FormArrayItem> => {
	const properties: Array<FormArrayItem> = []
	if (!schema) {
		return properties
	}
	if (groupKey === "default") {
		for (const key in schema) {
			const v = schema[key]
			if (isFormGroupProps(v)) continue
			properties.push(disposeFormItem(key, v))
		}
	} else {
		for (const key in schema) {
			const v = schema[key]
			if (!isFormGroupProps(v) || key !== groupKey) continue
			return getFormSchemaByKey(v.children, groupKey)
		}
	}
	return properties
}

const disposeFormItem = (key: string, item: FormItem): FormArrayItem => {
	const disposeItem: FormArrayItem = {
		...item,
		key: key,
		span: item.span ?? 24,
		required: item.required ?? false,
	}
	// 如果required为true且rules为undefined或者null，会自动添加校验方式msg为`请(输入|选择)${title}
	if (disposeItem.required && disposeItem.rules == undefined) {
		disposeItem.rules = [
			{
				required: true,
				message: `请输入${disposeItem.title}`,
			},
		]
	}
	return disposeItem
}

// 获取导航list
export const getNavList = (schema: FormSchema, isFormGroup: boolean): Array<FormNavItem> => {
	const list: Array<FormNavItem> = []
	if (!isFormGroup) {
		list.push({
			key: "default",
			type: "group",
			title: "",
		})
		return list
	}
	for (const key in schema) {
		const v = schema[key]
		if (isFormGroupProps(v)) {
			list.push({
				key: key,
				type: v.type,
				title: v.title,
			})
		}
	}
	return list
}
