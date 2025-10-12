import BaseButtonIcon from "../../base/base-button-icon"

type Props = {
	onRefresh: () => void
}

const TableRefresh: React.FC<Props> = ({ onRefresh }) => {
	return (
		<BaseButtonIcon
			color="default"
			variant="filled"
			icon="ant-design:reload-outlined"
			tooltipPlacement="top"
			tooltipContent="刷新"
			onClick={onRefresh}
		/>
	)
}

export default TableRefresh
