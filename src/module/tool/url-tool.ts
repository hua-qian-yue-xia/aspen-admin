/**
 * 将参数对象序列化为查询字符串（不包含问号）。
 * 规则：
 * - 忽略 null、空字符串 ""、undefined 的字段；
 * - 对 key 与 value 使用 encodeURIComponent 进行编码；
 * - 对一层嵌套对象（含数组）使用 bracket 写法：prop[key]=value；
 * - 返回的字符串以 "&" 结尾，调用方可按需去掉最后一个 "&"。
 * 示例：toQueryString({ a: 1, b: { c: 2 } }) => "a=1&b%5Bc%5D=2&"
 * @param params 参数对象
 * @returns 序列化后的查询字符串
 */
export function toQueryString(params: Record<string, any>): string {
	let result = ""
	for (const propName of Object.keys(params)) {
		const value = params[propName]
		const part = encodeURIComponent(propName) + "="
		if (value === null || value === "" || typeof value === "undefined") continue
		if (typeof value === "object") {
			for (const key of Object.keys(value)) {
				if (value[key] !== null && value[key] !== "" && typeof value[key] !== "undefined") {
					const params = propName + "[" + key + "]"
					const subPart = encodeURIComponent(params) + "="
					result += subPart + encodeURIComponent(value[key]) + "&"
				}
			}
		} else {
			result += part + encodeURIComponent(value) + "&"
		}
	}
	return result?.slice(0, -1)
}
