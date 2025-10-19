export type StorageType = "local" | "session"

export function createStorage<T extends object>(type: StorageType, storagePrefix: string) {
	const stg = type === "session" ? window.sessionStorage : window.localStorage

	const storage = {
		clear() {
			stg.clear()
		},
		/**
		 * 获取存储数据
		 * @param key 存储键名
		 */
		get<K extends keyof T>(key: K): T[K] | null {
			const json = stg.getItem(`${storagePrefix}${key as string}`)
			if (json) {
				let storageData: T[K] | null = null

				try {
					storageData = JSON.parse(json)
				} catch (error) {
					console.warn(`解析${json}时出错:`, error)
				}

				if (storageData) {
					return storageData as T[K]
				}
			}
			stg.removeItem(`${storagePrefix}${key as string}`)
			return null
		},
		remove(key: keyof T) {
			stg.removeItem(`${storagePrefix}${key as string}`)
		},
		/**
		 * 设置存储数据
		 * @param key 存储键名
		 * @param value 存储值
		 */
		set<K extends keyof T>(key: K, value: T[K]) {
			const json = JSON.stringify(value)

			stg.setItem(`${storagePrefix}${key as string}`, json)
		},
	}
	return storage
}
