import { createStorage } from "@aspen/common"

export type GenStorageOptions = {
	"MENU-PATH": Array<string>
}

export const genStorage = createStorage<GenStorageOptions>("local", "GEN-")

export const dictStorage = createStorage<Record<DICT_KEYS, any>>("local", "DICT-")
