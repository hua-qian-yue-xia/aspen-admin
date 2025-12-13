import React, { memo, useEffect, useMemo } from "react"

import { Select } from "antd"
import type { SelectProps } from "antd"

import { useDict } from "@@/hooks/use-dict"

type Props = { dictType: DICT_KEYS; autoSelectFirst?: boolean } & Pick<
	SelectProps,
	"value" | "onChange" | "placeholder" | "mode"
>

const DictSelect: React.FC<Props> = (props) => {
	const {
		dictType,
		autoSelectFirst = false,
		placeholder = "请选择",
		value,
		onChange = undefined,
		mode,
		...rest
	} = props

	// 获取字典数据
	const [dict, loading] = useDict(dictType)
	const targetDict = dict[dictType]

	const options = useMemo(() => {
		return (
			targetDict?.map((v) => ({
				label: v.summary,
				value: v.code,
			})) ?? []
		)
	}, [targetDict])

	useEffect(() => {
		if (autoSelectFirst && !value && options.length) {
			onChange?.(options[0].value, undefined)
		}
	}, [autoSelectFirst, value, options, mode, onChange])

	return (
		<Select value={value} loading={loading} options={options} placeholder={placeholder} onChange={onChange} {...rest} />
	)
}

export default memo(DictSelect)
