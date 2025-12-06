export function getLocalIcons() {
	const svgIcons = import.meta.glob("/src/module/assets/svg-icon/*.svg")
	const keys = Object.keys(svgIcons)
		.map((item) => item.split("/").at(-1)?.replace(".svg", "") || "")
		.filter(Boolean)
	return keys
}
