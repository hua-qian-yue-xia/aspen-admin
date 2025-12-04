import { Select } from "antd"
import type { SelectProps } from "antd"

export type BaseSelectOption<T = any> = {
	label: string
	value: string
	extra?: T
}

export type BaseSelectProps<T = any> = {
	getOptions?: () => Promise<Array<BaseSelectOption<T>> | null> | Array<BaseSelectOption<T>> | null
} & SelectProps

const BaseSelect: React.FC<BaseSelectProps> = (props) => {
	const { value, showSearch = true, allowClear = true, getOptions, ...rest } = props

	console.log(value, "value")

	const [options, setOptions] = useState<Array<BaseSelectOption>>([])

	useEffect(() => {
		if (value !== null && options.length === 0) {
			tryGetOptions()
		}
	}, [value, options])

	const displayValue = useMemo(() => {
		if (!options || !options.length) return null
		if (props.mode === "multiple") {
			if (!value) return []
			if (Array.isArray(value)) return value
			return [value]
		}
		if (Array.isArray(value)) {
			return value[0]
		}
		return value || null
	}, [value, props.mode, options])

	const tryGetOptions = async () => {
		if (!getOptions) return
		const result = getOptions()
		if (result instanceof Promise) {
			const options = await result
			setOptions(options ?? [])
		} else {
			setOptions(result ?? [])
		}
	}

	return (
		<Select
			value={displayValue}
			showSearch={showSearch}
			allowClear={allowClear}
			options={options}
			onOpenChange={(visible) => visible && tryGetOptions()}
			{...rest}
		/>
	)
}

export default BaseSelect
