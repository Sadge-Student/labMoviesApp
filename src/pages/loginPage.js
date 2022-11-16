import React from "react";
import Login from "../components/login";
import { AuthProvider } from "../contexts/authContext";
import { ToggleColorMode } from "../components/themeToggle";

export default function LoginPage() {
    return (
        <>
            <AuthProvider>
                <ToggleColorMode>
                    <Login />
                </ToggleColorMode>
            </AuthProvider>
        </>
    );
};