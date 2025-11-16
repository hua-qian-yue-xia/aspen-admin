import { CSSProperties, useEffect, useMemo, useRef } from "react"
import { useRive, useStateMachineInput } from "@rive-app/react-canvas"

export type RivePlayerProps = {
	src: string
	artboard?: string
	stateMachines?: string | string[]
	autoplay?: boolean
	followMouse?: boolean
	width?: number | string
	height?: number | string
	className?: string
	style?: CSSProperties
}

/**
 * 通用 Rive 播放组件
 * - 直接播放 .riv 文件
 * - 可选：将鼠标位置归一化 (0~1) 写入 state machine 的 `mouseX` / `mouseY` 输入，实现“眼睛/头部跟随鼠标”
 */
const RivePlayer: React.FC<RivePlayerProps> = ({
	src, // Rive 文件路径（可为 /public 下的相对路径或 import 的资源）
	artboard, // 可选：指定使用的 Artboard 名称（不填则使用默认）
	stateMachines, // 可选：状态机名称或数组（如 'FollowHead'），用于驱动交互
	autoplay = true, // 是否自动播放动画（默认 true）
	followMouse = false, // 是否启用鼠标跟随互动（需要状态机中存在 mouseX/mouseY 输入）
	width = 320, // 容器宽度（数值或字符串，如 '100%'）
	height = 320, // 容器高度（数值或字符串，如 '100%'）
	className, // 容器的 className（用于样式控制）
	style, // 容器的内联样式对象
}) => {
	const smList = useMemo(() => {
		if (!stateMachines) return [] as string[]
		return Array.isArray(stateMachines) ? stateMachines : [stateMachines]
	}, [stateMachines])

	const wrapRef = useRef<HTMLDivElement | null>(null)

	const { rive, RiveComponent } = useRive({
		src: "/riv/login-bg.riv",
		artboard,
		stateMachines: smList.length ? smList : undefined,
		autoplay,
	})

	console.log(rive, "rive")

	// 固定 Hook 调用顺序：始终调用 useStateMachineInput（若未找到状态机会返回 undefined）
	const firstSM = smList.length ? smList[0] : ""
	const mouseX = useStateMachineInput(rive, firstSM, "mouseX", 0)
	const mouseY = useStateMachineInput(rive, firstSM, "mouseY", 0)

	useEffect(() => {
		if (!followMouse) return
		const el = wrapRef.current
		if (!el || !mouseX || !mouseY) return

		const onMove = (e: MouseEvent) => {
			const rect = el.getBoundingClientRect()
			const nx = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
			const ny = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1)
			mouseX.value = nx
			mouseY.value = ny
		}
		const onLeave = () => {
			// 离开时回到中心
			mouseX.value = 0.5
			mouseY.value = 0.5
		}
		el.addEventListener("mousemove", onMove)
		el.addEventListener("mouseleave", onLeave)
		return () => {
			el.removeEventListener("mousemove", onMove)
			el.removeEventListener("mouseleave", onLeave)
		}
	}, [followMouse, mouseX, mouseY])

	return (
		<div ref={wrapRef} style={{ width, height, ...style }} className={className}>
			<RiveComponent className="full" />
		</div>
	)
}

export default RivePlayer
