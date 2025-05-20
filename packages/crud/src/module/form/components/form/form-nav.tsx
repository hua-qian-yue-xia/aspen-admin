import type { FormNavItem } from "../../shared/form-props"

type Props = {
	list: Array<FormNavItem>
}

const FormNav: React.FC<Props> = ({ list }) => {
	if (!list.length) return null
	return (
		<ul>
			{list.map((item) => {
				return <li key={item.key}>{item.title}</li>
			})}
		</ul>
	)
}

export default FormNav
