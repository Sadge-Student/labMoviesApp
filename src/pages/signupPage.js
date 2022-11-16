import React from "react";
import SignUp from "../components/signup";
import { AuthProvider } from "../contexts/authContext";

export default function SignUpPage() {

  return (
    <>
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </>
  );
};