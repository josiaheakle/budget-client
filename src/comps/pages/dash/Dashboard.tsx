/**
 * route "/"
 * ---
 * Must be logged in to access this page.
 * Central page to access all other pages (besides login).
 */

import * as React from "react";

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
	return <div>Dashboard</div>;
};
