import { URL, fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

import { registerPlugins } from "./build"

// https://vite.dev/config/
export default defineConfig((configEnv) => {
	return {
		plugins: [react(), ...registerPlugins()],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("src", import.meta.url)),
				"@@": fileURLToPath(new URL("src/module", import.meta.url)),
				"~": fileURLToPath(new URL("./", import.meta.url)),
			},
		},
		server: {
			open: true,
		},
	}
})
