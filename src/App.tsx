import DefaultLayout from "@@/layout/default-layout"

import { ConfigProvider } from "antd"

const App = () => {
	return (
		<ConfigProvider>
			<DefaultLayout />
		</ConfigProvider>
	)
}

export default App
