import { useEffect, useState } from "react"
import type { FrameDictItemEntity } from "@@/api/gen/gen-api"

import { getDict } from "@@/tool/dict-tool"

type DictRecord = Record<DICT_KEYS, Array<FrameDictItemEntity>>

/**
 * 获取字典数据Hook
 * @param dictTypes - 一个或多个字典类型
 * @returns 一个元组，包含字典数据和加载状态
 *
 * @example
 * const [dict, loading] = useDict('GENDER', 'STATUS');
 * dict.GENDER 将会是性别字典的数组
 * dict.STATUS 将会是状态字典的数组
 */
export const useDict = (...dictTypes: Array<DICT_KEYS>): [DictRecord, boolean] => {
	const [loading, setLoading] = useState(false)
	const [dict, setDict] = useState<DictRecord>({} as DictRecord)

	useEffect(() => {
		const fetchDict = async () => {
			if (dictTypes.length === 0) {
				setDict({} as DictRecord)
				return
			}
			setLoading(true)
			try {
				const result = await getDict(...dictTypes)
				setDict(result)
			} catch (error) {
				console.error("|获取字典数据Hook|,以外的错误", error)
			} finally {
				setLoading(false)
			}
		}

		fetchDict()
	}, [])
	return [dict, loading]
}
