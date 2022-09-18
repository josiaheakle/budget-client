import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProtectedRoute } from "../middleware/ProtectedRoute"
import { Login } from "./auth/Login"
import { Dashboard } from "./dash/Dashboard"

const Router = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/" element={<Dashboard />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default Router
