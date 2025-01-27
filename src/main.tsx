import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { registerAssets } from "@@/assets"

import App from "./App"

const registerApp = () => {
	registerAssets()

	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<App />
		</StrictMode>,
	)
}

registerApp()
