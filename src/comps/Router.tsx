import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/auth/AuthPage";

const Router = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
