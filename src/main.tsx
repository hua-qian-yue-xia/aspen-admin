import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App.tsx"
import { setupAppPlugin } from "@@/plugin"

setupAppPlugin()
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
