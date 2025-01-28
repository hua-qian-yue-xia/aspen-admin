import material from "@aspen/material"
import GlobalSearch from "./module/global/global-search"

const TestHeader: React.FC = () => {
	return (
		<div>
			<GlobalSearch />
		</div>
	)
}

const TestMain: React.FC = () => {
	return <div></div>
}

const TestAside: React.FC = () => {
	return <div></div>
}

const TestFooter: React.FC = () => {
	return <div></div>
}

const DefaultLayout = () => {
	return (
		<material.Layout
			headerNode={<TestHeader />}
			mainNode={<TestMain />}
			asideNode={<TestAside />}
			footerNode={<TestFooter />}
		/>
	)
}

export default DefaultLayout
