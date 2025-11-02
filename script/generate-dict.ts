import fs from "fs"

export const generateDictCode = async (url: string, output: string, fileName = "gen-dict") => {
	const genUrl = `${output}/${fileName}.ts`
	try {
		// 查询所有的字典code
		const res = await fetch(url)
		const data: any = await res.json()
		if (!data || !data.data || !data.data.length) {
			throw new Error("|查询所有的字典code|,返回的数据格式错误")
		}
		// 生成字典code
		let genTs = `export {} \n`
		genTs += `declare global { \n`
		genTs += `type DICT_KEYS = ${data.data.map((item: any) => `"${item}"`).join(" | \n")} \n`
		genTs += `}`
		// 是否有该文件
		if (!fs.existsSync(genUrl)) fs.mkdirSync(output, { recursive: true })
		// 写入文件
		await fs.promises.writeFile(genUrl, genTs)
		console.log("|查询所有的字典code|,写入文件成功", genUrl)
	} catch (err) {
		console.error("|查询所有的字典code|,意外的错误", err)
	}
}
