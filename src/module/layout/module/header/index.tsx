import React from "react"

type Props = {
	header: number
}

const GlobalHeader: React.FC<Props> = ({ header }) => {
	console.log(header)
	return <></>
}

export default GlobalHeader
