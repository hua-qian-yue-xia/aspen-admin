import { API } from "@/module/api/share/request-tool"
import type { FrameDictItemEntity } from "@@/api/gen/gen-api"

import { dictStorage } from "./storage-tool"

export const getDict = async (
	...dictType: Array<DICT_KEYS>
): Promise<Record<DICT_KEYS, Array<FrameDictItemEntity>>> => {
	const result: any = {}
	// 查找字典项
	if (dictType.length === 0) return result
	for (let i = 0; i < dictType.length; i++) {
		const dictKey = dictType[i]
		const storageTarget = dictStorage.get(dictKey)
		if (storageTarget) {
			result[dictKey] = storageTarget
			continue
		}
		const dictItem = await getDictItemByApi(dictKey)
		if (dictItem) {
			result[dictKey] = dictItem
			dictStorage.set(dictKey, dictItem)
			continue
		}
		result[dictKey] = []
	}
	return result
}

const getDictItemByApi = async (dict: DICT_KEYS) => {
	const { data } = await API.frame.frameDictItemControllerGetListBydictCode(dict)
	if (data && data.length) {
		return data
	}
	return null
}
