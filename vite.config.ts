import { URL, fileURLToPath } from "node:url"

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

import { registerPlugins } from "./build"
import { generateOpenApi } from "./script/generate-open-api"
import { generateViewMenuPathPlugin } from "./script/generate-view-menu"

// https://vite.dev/config/
export default defineConfig((configEnv) => {
	console.log("configEnv:", configEnv)
	generateOpenApi("http://127.0.0.1:7001/doc-json", fileURLToPath(new URL("src/module/api/gen", import.meta.url)))

	return {
		plugins: [react(), generateViewMenuPathPlugin(), ...registerPlugins()],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("src", import.meta.url)),
				"@@": fileURLToPath(new URL("src/module", import.meta.url)),
				"~": fileURLToPath(new URL("./", import.meta.url)),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					javascriptEnabled: true,
				},
			},
		},
		server: {
			fs: {
				cachedChecks: false,
			},
			host: "0.0.0.0",
			open: false,
			port: 7002,
		},
	} as any
})
