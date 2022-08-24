import * as React from "react";

export const useAsyncEffect = (action: () => Promise<void>, depList: React.DependencyList) => {
	return React.useEffect(() => {
		(async () => {
			await action();
		})();
	}, depList);
};
