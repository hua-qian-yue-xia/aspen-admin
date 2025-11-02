type BaseEnumOptions = {
	/**
	 * 枚举值
	 */
	code: string
	/**
	 * 枚举描述
	 */
	summary: string
	/**
	 * 枚举排序
	 * @default 0
	 */
	order?: number
}

export class BaseEnum {
	readonly [key: string]: BaseEnumOptions

	// @ts-expect-error - Object.values() doesn't recognize the index signature type
	getAll(): Array<BaseEnumOptions> {
		return Object.values(this)
	}

	// @ts-expect-error - Method access on class with index signature
	getByCode(code: string): BaseEnumOptions | null {
		return this.getAll().find((item) => item.code === code) ?? null
	}

	// @ts-expect-error - Method access on class with index signature
	getByCodes(codes: Array<string>): Array<BaseEnumOptions> {
		return this.getAll().filter((item) => codes.includes(item.code))
	}

	// @ts-expect-error - Method access on class with index signature
	getBySummary(summary: string): BaseEnumOptions | null {
		return this.getAll().find((item) => item.summary === summary) ?? null
	}

	// @ts-expect-error - Method access on class with index signature
	getBySummarys(summaries: Array<string>): Array<BaseEnumOptions> {
		return this.getAll().filter((item) => summaries.includes(item.summary))
	}
}
