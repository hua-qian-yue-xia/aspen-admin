import { router, context } from "@@/index"

const App = () => {
	return (
		<context.antd.GlobalAntdProvider>
			<router.RouterProvider />
		</context.antd.GlobalAntdProvider>
	)
}

export default App
