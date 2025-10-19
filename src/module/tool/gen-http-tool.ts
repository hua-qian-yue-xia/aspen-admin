/**
 * 获取视图菜单路径
 * @description 智能在web环境中使用
 * @returns 视图菜单路径数组
 */
export const getViewMenuPath = async () => {
	try {
		const response = await fetch("/api/menu-paths")
		const data = await response.json()
		if (data && data.menuPaths && data.menuPaths.length) {
			window.localStorage.setItem("GEN-MENU-PATH", JSON.stringify(data.menuPaths))
		}
	} catch (error) {
		console.error("获取菜单路径失败:", error)
	}
}
