import * as React from "react"
import { useUser } from "../../../hooks/UserHooks"
import { DataController } from "../../../modules/DataController"
import { Page } from "../Page"

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
	const user = useUser()

	React.useEffect(() => {
		DataController.refreshModels()
	}, [])

	return <Page>budget</Page>
}

export { Dashboard }
