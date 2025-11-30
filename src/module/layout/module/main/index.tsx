import KeepAlive, { useKeepAliveRef } from "keepalive-for-react"
import { useLocation, Outlet } from "react-router-dom"

import { store } from "@@/index"

import { components } from "@/module"

import "./css/main-css.scss"

const useGetCacheKey = () => {
	const location = useLocation()
	const cacheKey = `${location.pathname}${location.search}`.slice(1).split("/").join("_")
	return cacheKey
}

const GlobalMain: React.FC = () => {
	const { themeStore } = store
	const { main } = themeStore.store((store) => store)

	const aliveRef = useKeepAliveRef()

	const cacheKey = useGetCacheKey()

	const transitionName = main.animate ? main.animateMode : ""

	useEffect(() => {
		aliveRef.current?.refresh()
	}, [main.reload])

	return (
		<components.common.DarkModeContainer className="full flex-grow p-12px bg-layout">
			<KeepAlive activeCacheKey={cacheKey} aliveRef={aliveRef} cacheNodeClassName={main.reload ? transitionName : ""}>
				<Outlet />
			</KeepAlive>
		</components.common.DarkModeContainer>
	)
}

export default GlobalMain
