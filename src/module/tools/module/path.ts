import * as path from "node:path"

const getSrcPath = () => {
  return path.join(process.cwd(), "src")
}

const getPublicPath = () => {
  return path.join(process.cwd(), "public")
}

const getModulePath = () => {
  return path.join(getSrcPath(), "module")
}

export default { getSrcPath, getPublicPath, getModulePath }
