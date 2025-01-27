import presetUno from "@unocss/preset-uno"
import { defineConfig } from "@unocss/vite"
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
	},
	transformers: [transformerDirectives(), transformerVariantGroup()],
})
