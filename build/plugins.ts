import path from "node:path"

import unocss from "@unocss/vite"
import presetIcons from "@unocss/preset-icons"
import IconsResolver from "unplugin-icons/resolver"
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders"

import Icons from "unplugin-icons/vite"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import Inspect from "vite-plugin-inspect"

import AutoImport from "unplugin-auto-import/vite"

const getSvgPath = () => {
	return path.join(process.cwd(), "src/module/assets/svg-icon")
}

// unocss
const registerUnocss = (env: Env.ImportMeta) => {
	const localIconPath = getSvgPath()

	const collectionName = env.VITE_ICON_LOCAL_PREFIX.replace(`${env.VITE_ICON_PREFIX}-`, "")
	return unocss({
		presets: [
			presetIcons({
				[collectionName]: {
					local: FileSystemIconLoader(localIconPath, (svg) => {
						return svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
					}),
				},
				prefix: `${env.VITE_ICON_PREFIX}-`,
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
const unpluginIcon = (env: Env.ImportMeta) => {
	const localIconPath = getSvgPath()
	const collectionName = env.VITE_ICON_LOCAL_PREFIX.replace(`${env.VITE_ICON_PREFIX}-`, "")

	return [
		createSvgIconsPlugin({
			customDomId: "_ASPEN_SVG_ICON_LOCAL__",
			iconDirs: [localIconPath],
			inject: "body-last",
			symbolId: `${env.VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
		}),
		Icons({
			compiler: "jsx",
			customCollections: {
				[collectionName]: FileSystemIconLoader(localIconPath, (svg) => {
					return svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
				}),
			},
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

const registerAutoImport = (env: Env.ImportMeta) => {
	const collectionName = env.VITE_ICON_LOCAL_PREFIX.replace(`${env.VITE_ICON_PREFIX}-`, "")
	return AutoImport({
		dts: "src/module/gen/type/auto-imports.d.ts",
		imports: ["react", { from: "react", imports: ["FC"], type: true }],
		include: [/\.[tj]sx?$/],
		resolvers: [
			IconsResolver({
				componentPrefix: env.VITE_ICON_PREFIX,
				customCollections: [collectionName],
				extension: "tsx",
				prefix: env.VITE_ICON_PREFIX,
			}),
			autoImportAntd,
		],
	})
}

export const registerPlugins = (env: Env.ImportMeta) => {
	return [registerAutoImport(env), registerUnocss(env), ...unpluginIcon(env), Inspect()]
}
