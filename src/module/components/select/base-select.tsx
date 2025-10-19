import { Select } from "antd"
import type { SelectProps } from "antd"

export type BaseSelectOption = {
	label: string
	value: string
}

export type BaseSelectProps = {
	getOptions?: () => Promise<Array<BaseSelectOption> | null> | Array<BaseSelectOption> | null
} & SelectProps

const BaseSelect: React.FC<BaseSelectProps> = (props) => {
	const { showSearch = true, allowClear = true, getOptions, ...rest } = props

	const [options, setOptions] = useState<Array<BaseSelectOption>>([])

	const tryGetOptions = async () => {
		if (getOptions) {
			const result = getOptions()
			if (result instanceof Promise) {
				const options = await result
				setOptions(options ?? [])
			} else {
				setOptions(result ?? [])
			}
		}
	}

	return (
		<Select {...rest} showSearch={showSearch} allowClear={allowClear} options={options} onOpenChange={tryGetOptions} />
	)
}

export default BaseSelect
