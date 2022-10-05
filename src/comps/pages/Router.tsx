import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Nav } from "../header/Nav"
import { ProtectedRoute } from "../middleware/ProtectedRoute"
import { AccountPage } from "./account/AccountPage"
import { Login } from "./auth/Login"
import { BudgetPage } from "./budget/BudgetPage"
import { Dashboard } from "./dash/Dashboard"
import { ExpensePage } from "./expenses/ExpensePage"

const Router = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/" element={<Dashboard />} />
						<Route path="/budget" element={<BudgetPage />} />
						<Route path="/expenses" element={<ExpensePage />} />
						<Route path="/account" element={<AccountPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default Router
