import React from "react"

import { Tag } from "antd"

type Props = {
	dictType: DICT_KEYS
	value: string
}

const DictTag: React.FC<Props> = ({ dictType, value }) => {
	// 查找字典项
	return <Tag></Tag>
}

export default DictTag
