export type CrudFormInstance = {
	on: {
		afterValidate: () => void
	}
}

export const useCrudForm = (): CrudFormInstance => {
	const crudFormInstance = useRef<CrudFormInstance>({
		on: {
			afterValidate: function () {},
		},
	})
	return crudFormInstance.current
}
