import React from "react";
import SignUp from "../components/signup";
import { AuthProvider } from "../contexts/authContext";
import { ToggleColorMode, ThemeToggle} from "../components/themeToggle";

export default function SignUpPage() {

  return (
    <>
      <AuthProvider>
        <ToggleColorMode>
          {/* <ThemeToggle /> */}
          <SignUp />
        </ToggleColorMode>
      </AuthProvider>
    </>
  );
};