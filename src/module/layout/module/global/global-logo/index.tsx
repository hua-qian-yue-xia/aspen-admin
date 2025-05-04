import { Link, LinkProps } from "react-router-dom"

type Props = {
	/**
	 * 是否展示标题
	 * @default true
	 */
	visibleTitle?: boolean
} & Omit<LinkProps, "to">

const GlobalLogo: React.FC<Props> = ({ visibleTitle = true, ...res }) => {
	return (
		<Link className="full flex-row-center" to="/" {...res}>
			<h2
				className="pl-8px text-16px text-primary font-bold transition duration-300 ease-in-out"
				style={{ display: visibleTitle ? "block" : "none" }}
			>
				aspen
			</h2>
		</Link>
	)
}

export default GlobalLogo
