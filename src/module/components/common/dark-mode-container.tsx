import { mergeClass } from "@aspen/common"

type Props = {
	inverted?: boolean
} & React.ComponentProps<"div">

const DarkModeContainer: React.FC<Props> = memo(({ children, className, inverted, ...rest }) => {
	const getContainerClass = useMemo(() => {
		return mergeClass("bg-container text-base-text transition-300", { "bg-inverted text-#1f1f1f": inverted }, className)
	}, [className, inverted])
	return (
		<div className={getContainerClass} {...rest}>
			{children}
		</div>
	)
})

export default DarkModeContainer
