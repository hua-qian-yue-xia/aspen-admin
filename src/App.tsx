import { ConfigProvider } from "antd"

import { router } from "@@/index"

const App = () => {
	return (
		<ConfigProvider>
			<router.RouterProvider />
		</ConfigProvider>
	)
}

export default App
