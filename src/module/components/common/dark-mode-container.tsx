import { mergeClass } from "@aspen/common"

type Props = {
	/**
	 * 是否是暗色模式
	 * @default false
	 */
	isDark?: boolean
} & React.ComponentProps<"div">

const DarkModeContainer: React.FC<Props> = memo(({ children, className, isDark = false, ...rest }) => {
	const getContainerClass = useMemo(() => {
		return mergeClass("bg-container text-base-text transition-300", { "bg-inverted text-#1f1f1f": isDark }, className)
	}, [className, isDark])
	return (
		<div className={getContainerClass} {...rest}>
			{children}
		</div>
	)
})

export default DarkModeContainer
