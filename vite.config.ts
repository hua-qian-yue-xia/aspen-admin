import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

import { pathTool } from "./src/module/tools"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": pathTool.getPublicPath(),
      "@": pathTool.getSrcPath(),
      "@@": pathTool.getComponentPath(),
    },
  },
})
