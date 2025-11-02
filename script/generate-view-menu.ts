import { readdirSync, statSync } from "fs"
import { join, relative } from "path"

import { Plugin } from "vite"

const generateViewMenuPath = () => {
	const viewDir = join(process.cwd(), "src/view")
	const indexFiles: string[] = []
	/**
	 * 递归扫描目录，查找所有 index.tsx 文件
	 * @param dir 要扫描的目录路径
	 */
	const scanDirectory = (dir: string) => {
		try {
			const items = readdirSync(dir)

			for (const item of items) {
				const fullPath = join(dir, item)
				const stat = statSync(fullPath)
				if (stat.isDirectory()) {
					// 递归扫描子目录
					scanDirectory(fullPath)
				} else if (item === "index.tsx") {
					// 找到 index.tsx 文件，计算相对于 view 目录的路径
					const relativePath = relative(viewDir, dir)
					const menuPath = relativePath ? `/view/${relativePath}/index` : "/view/index"
					indexFiles.push(menuPath)
				}
			}
		} catch (error) {
			console.warn(`扫描目录 ${dir} 时出错:`, error)
		}
	}
	scanDirectory(viewDir)
	indexFiles.sort()
	console.table(indexFiles)
	return indexFiles
}

export const generateViewMenuPathPlugin = (): Plugin => {
	return {
		name: "generate-view-menu-path-plugin",
		configureServer(server) {
			const menuPaths = generateViewMenuPath()
			// 添加中间件，提供菜单路径数据给客户端
			server.middlewares.use("/api/menu-paths", (req, res) => {
				res.setHeader("Content-Type", "application/json")
				res.setHeader("Access-Control-Allow-Origin", "*")
				res.end(JSON.stringify({ menuPaths }))
			})
		},
	}
}
