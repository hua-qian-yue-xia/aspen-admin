import unocss from "@unocss/vite"
import AutoImport from "unplugin-auto-import/vite"

// unocss
const registerUnocss = () => {
	return unocss({ presets: [] })
}

// auto import
const registerAutoImport = () => {
	return AutoImport({
		dirs: ["src/module/components/**"],
		dts: "src/module/gen/type/auto-imports.d.ts",
		imports: ["react"],
		include: [/\.[tj]sx?$/],
	})
}

export const registerPlugins = () => {
	return [registerUnocss(), registerAutoImport()]
}
