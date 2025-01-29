import unocss from "@unocss/vite"
import presetIcons from "@unocss/preset-icons"
import IconsResolver from "unplugin-icons/resolver"

import Icons from "unplugin-icons/vite"

import AutoImport from "unplugin-auto-import/vite"

// unocss
const registerUnocss = () => {
	return unocss({
		presets: [
			presetIcons({
				scale: 1,
				warn: true,
				extraProperties: {
					display: "inline-block",
				},
			}),
		],
	})
}

// 自动注册图标
const unpluginIcon = () => {
	return [
		Icons({
			autoInstall: true,
			compiler: "jsx",
			defaultClass: "inline-block",
			jsx: "react",
			scale: 1,
		}),
	]
}

// auto import
const autoImportAntd = (componentName: string) => {
	const pattern = /^A[A-Z]/
	if (pattern.test(componentName)) {
		return { from: "antd", name: componentName.slice(1) }
	}
	return null
}

const registerAutoImport = () => {
	return AutoImport({
		dirs: ["src/module/components/**"],
		dts: "src/module/gen/type/auto-imports.d.ts",
		imports: ["react"],
		include: [/\.[tj]sx?$/],
		resolvers: [
			IconsResolver({
				componentPrefix: "Icon",
				prefix: "Icon",
				extension: "tsx",
			}),
			autoImportAntd,
		],
	})
}

export const registerPlugins = () => {
	return [registerUnocss(), ...unpluginIcon(), registerAutoImport()]
}
