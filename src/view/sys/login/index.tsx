import React from "react"
import { Outlet } from "react-router-dom"

import { Card } from "antd"

import LoginPageHeader from "./cmp/header"

const LoginPage: React.FC = () => {
	return (
		<div className="relative size-full flex-row-center overflow-hidden">
			<Card className="relative z-4 w-auto rd-12px" variant="borderless">
				<div className="w-400px lt-sm:w-300px">
					<header>
						<LoginPageHeader />
					</header>
					<main>
						<Outlet />
					</main>
				</div>
			</Card>
		</div>
	)
}

export default LoginPage
