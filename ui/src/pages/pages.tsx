import Page from "../components/Page";
import LoginComponent from "../components/LoginComponent";
import React from "react";
import RegistrationComponent from "../components/RegistrationComponent";
import DashboardComponent from "../components/DashboardComponent";

export const LoginPage:React.FC<any> = props => {
    return(
        <Page title={"Login"}>
            <LoginComponent  />
        </Page>
    )
}

export const RegisterPage:React.FC<any> = props => {
    return (
        <Page title={"Registration"}>
            <RegistrationComponent />
        </Page>
    )
}

export const DashboardPage:React.FC<any> = props => {
    return (
<DashboardComponent />
    )
}