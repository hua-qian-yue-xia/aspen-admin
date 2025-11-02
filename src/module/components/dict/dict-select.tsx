import React, { memo } from "react"

import { Select } from "antd"
import type { SelectProps } from "antd"

import { useDict } from "@@/hooks/use-dict"

type Props = { dictType: DICT_KEYS; autoSelectFirst?: boolean } & Pick<
	SelectProps,
	"value" | "onChange" | "placeholder"
>

const DictSelect: React.FC<Props> = (props) => {
	const { dictType, autoSelectFirst = false, placeholder = "请选择", value = null, ...rest } = props
	let selectValue = value
	// 获取字典数据
	const [dict, loading] = useDict(dictType)
	const targetDict = dict[dictType]
	const options =
		targetDict?.map((v) => ({
			label: v.summary,
			value: v.code,
		})) ?? []
	if (autoSelectFirst && !value && options.length) {
		selectValue = options[0].value
	}
	return <Select loading={loading} options={options} placeholder={placeholder} value={selectValue} {...rest}></Select>
}

export default memo(DictSelect)
