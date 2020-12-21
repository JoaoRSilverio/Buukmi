import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import {ChakraProvider, Box,HStack, Heading, VStack} from "@chakra-ui/react";
import RegistrationComponent from "./components/RegistrationComponent";
import LoginComponent from "./components/LoginComponent";
import ProfileComponent from "./components/ProfileComponent";
import { Provider } from "react-redux";
import store from "./redux/Store";
import ServiceEditor from "./components/ServiceEditor";
import { IService, IServiceFeatureSpec, IServiceTemplate } from "./interfaces/interfaces";
import { Currencies, Money } from "ts-money";
import { eyebrowFeatureOptions, haircutFeatures, pcHairLenght, TEMPLATES } from "./TestData";
import PreCondition from "./components/views/PreCondition";
import Page from "./components/Page";
import ServiceFeatureSpec from "./components/views/ServiceFeatureSpec";
import EntitySelector from "./components/selectors/EntityMultiSelector";
import { ChakraProvider, Heading, HStack, VStack } from "@chakra-ui/react";
import DashboardComponent from "./components/DashboardComponent";
import {DashboardPage, LoginPage, RegisterPage} from "./pages/pages";


const selectedServiceFeature: IServiceFeatureSpec = {
    selectedOptions: [...eyebrowFeatureOptions],
    selectedFeature: haircutFeatures[0],
    selectedRequests: []
}
const selectedServiceFeature2: IServiceFeatureSpec = {
    selectedOptions: [eyebrowFeatureOptions[1]],
    selectedFeature: haircutFeatures[0],
    selectedRequests: []
}

interface IAppState {
    activeServiceFeature: IServiceFeatureSpec;
    templateSelection: IServiceTemplate[];
}

export default class App extends React.Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        this.onSaved = this.onSaved.bind(this);
        this.state = {
            activeServiceFeature: selectedServiceFeature2,
            templateSelection: [],
        }
    }
    onSaved(entity: any) {
        console.log("saved", entity);
    }
    render() {
        const isLoggedIn =  !!store.getState().Auth.tokens.accessToken
        return (
            <Router>
            <ChakraProvider>
                <Provider store={store}>
                        <Switch>
                            <Route path="/register">
                                 <RegisterPage />
                            </Route>
                            <Route path={"/dashboard"}>
                                {true && <DashboardPage />}
                            </Route>
                            <Route exact path="/" >
                                <LoginPage />
                            </Route>
                        </Switch>
                </Provider>
            </ChakraProvider>
            </Router>

        );

    }
}
const appContainer = document.querySelector("#app-container");
ReactDOM.render(<App />, appContainer);
