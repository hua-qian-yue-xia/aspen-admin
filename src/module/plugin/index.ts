import { default as assetsPlugin } from "./module/assets.ts"

export const setupAppPlugin = () => {
  assetsPlugin.setupAssets()
}
