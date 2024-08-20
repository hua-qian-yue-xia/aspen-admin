import * as path from "node:path"

const getSrcPath = () => {
  return path.join(process.cwd(), "src")
}

const getPublicPath = () => {
  return path.join(process.cwd(), "public")
}

const getModulePath = () => {
  return ""
}

export default { getSrcPath, getPublicPath, getComponentPath: getModulePath }
