import * as React from "react"
import { RouterProvider } from "react-router-dom"
import { ConfigProvider } from "antd"

import { routerList } from "@@/router"

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <RouterProvider router={routerList}></RouterProvider>
    </ConfigProvider>
  )
}

export default App
