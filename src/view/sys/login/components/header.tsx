import React from "react"

import { components } from "@@/index"

const LoginPageHeader: React.FC = memo(() => {
	const { global } = components

	return (
		<div className="flex-row-center">
			<global.GlobalLogo disableLink />
		</div>
	)
})

export default LoginPageHeader
