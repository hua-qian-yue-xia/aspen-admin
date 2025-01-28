import { defineConfig } from "@unocss/vite"
import presetUno from "@unocss/preset-uno"
import type { Theme } from "@unocss/preset-uno"
import transformerDirectives from "@unocss/transformer-directives"
import transformerVariantGroup from "@unocss/transformer-variant-group"

export default defineConfig<Theme>({
	content: {
		pipeline: {
			exclude: ["node_modules", "dist"],
		},
	},
	presets: [presetUno({ dark: "class" })],
	shortcuts: {
		full: "w-full h-full",
		"flex-row": "flex flex-row",
		"flex-col": "flex flex-col",
		"flex-row-center": "flex flex-row justify-center items-center",
		"flex-col-center": "flex flex-col justify-center items-center",
	},
	theme: {
		fontSize: {
			icon: "1.125rem",
		},
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
})
