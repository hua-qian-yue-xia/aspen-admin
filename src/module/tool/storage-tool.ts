import { createStorage } from "@aspen/common"

export type StorageGen = {
	"MENU-PATH": Array<string>
}

export const genStorage = createStorage<StorageGen>("local", "GEN-")
