import React, { memo } from "react"
import { Tag } from "antd"

import { useDict } from "@@/hooks/use-dict"

type Props = {
	dictType: DICT_KEYS
	dictItemCode: string | any
}

const DictTag: React.FC<Props> = ({ dictType, dictItemCode }) => {
	// 获取字典数据
	const [dict, loading] = useDict(dictType)

	if (!dictItemCode) return "-"

	if (loading) return <Tag>加载中</Tag>

	// 未知
	const targetDict = dict[dictType]
	if (!targetDict) return <Tag>未知</Tag>

	const targetDictItem = targetDict.find((item) => item.code === String(dictItemCode))
	if (!targetDictItem) return <Tag>未知</Tag>

	// tag
	return <Tag>{targetDictItem.summary}</Tag>
}

export default memo(DictTag)
