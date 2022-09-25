import * as React from "react"
import { useUser } from "../../../hooks/UserHooks"
import { DataController } from "../../../modules/DataController"
import { Header } from "../../header/Header"

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
	const user = useUser()

	React.useEffect(() => {
		DataController.refreshModels()
	}, [])

	return (
		<main className={`page`}>
			<Header />
		</main>
	)
}

export { Dashboard }
