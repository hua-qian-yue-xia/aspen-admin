import BaseButtonIcon from "../../base/base-button-icon"

import { platformTool } from "@aspen/common"

type Props = {
	/**
	 * 切换全屏
	 */
	toggle?: () => void
}

const TableFullScreen: React.FC<Props> = ({ toggle }) => {
	const [fullscreen, setFullscreen] = useState<boolean>(false)
	useEffect(() => {
		if (!platformTool.isBrowser()) return
		document.onfullscreenchange = () => {
			setFullscreen(!!document.fullscreenElement)
		}
	}, [])
	return (
		<BaseButtonIcon
			color="default"
			variant="filled"
			icon={fullscreen ? "gridicons:fullscreen-exit" : "gridicons:fullscreen"}
			tooltipPlacement="top"
			tooltipContent={fullscreen ? "退出全屏" : "全屏"}
			onClick={toggle}
		/>
	)
}

export default TableFullScreen
