import * as React from "react";
import { Login } from "./Login";

interface AuthPageProps {}

export const AuthPage: React.FC<AuthPageProps> = ({}) => {
  return (
    <main>
      <Login />
    </main>
  );
};
