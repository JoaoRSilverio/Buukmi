import React, {useState} from 'react';
import ReactDOM from "react-dom";
import {ChakraProvider, Box,HStack, Heading, VStack} from "@chakra-ui/react";
import RegistrationComponent from "./components/RegistrationComponent";
import LoginComponent from "./components/LoginComponent";
import ProfileComponent from "./components/ProfileComponent";
import {Provider} from "react-redux";
import store from "./redux/Store";
import ServiceEditor from "./components/ServiceEditor";
import {IService, IServiceFeatureSpec, IServiceTemplate} from "./interfaces/interfaces";
import {Currencies, Money} from "ts-money";
import {eyebrowFeatureOptions, haircutFeatures, pcHairLenght, TEMPLATES} from "./TestData";
import PreCondition from "./components/views/PreCondition";
import Page from "./components/Page";
import ServiceFeatureSpec from "./components/views/ServiceFeatureSpec";
import EntitySelector from "./components/selectors/ServiceTemplateSelector";

const selectedServiceFeature:IServiceFeatureSpec = {
    selectedOptions:[...eyebrowFeatureOptions],
    selectedFeature:haircutFeatures[0],
    selectedRequests:[]
}
const selectedServiceFeature2:IServiceFeatureSpec = {
    selectedOptions:[eyebrowFeatureOptions[1]],
    selectedFeature:haircutFeatures[0],
    selectedRequests:[]
}

interface IAppState {
    activeServiceFeature:IServiceFeatureSpec;
    templateSelection:IServiceTemplate[];
}

export default class App extends React.Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        this.onSaved = this.onSaved.bind(this);
        this.state = {
            activeServiceFeature: selectedServiceFeature2,
            templateSelection:[],
        }
    }
    onSaved(entity:any){
        console.log("saved",entity);
    }
render(){
    return (
        <EntitySelector
            entities={TEMPLATES}
            onSelectionChange={
                (templateSelection:IServiceTemplate[])=>this.setState({templateSelection})}
            selection={this.state.templateSelection} />
    )
        console.log(store.getState());
    return (
        <ChakraProvider>
            <Provider store={store}>
            <HStack align={"top"}>
                <RegistrationComponent />
                <LoginComponent/>
                <ProfileComponent/>

            </HStack>
                <HStack>
                    <ServiceEditor
                        editorTitle={"Service Editor"}
                        onSaved={this.onSaved}>
                    </ServiceEditor>
                </HStack>
                <HStack>
                    <Page title={"Elements"}>
                        <HStack>
                            <VStack>
                        <Heading size={"sm"}>{"Service PreCondition"}</Heading>
                    <PreCondition {...pcHairLenght}/>
                            </VStack>
                            <VStack >
                               <Page title={"Service Feature"}>
                                <ServiceFeatureSpec
                                    {...this.state.activeServiceFeature}
                                    onOptionsChange={(updatedFeature => this.setState({activeServiceFeature: updatedFeature}) )}/>
                               </Page>
                            </VStack>
                        </HStack>
                    </Page>
                </HStack>
                <HStack>
                    <Page title={"Template Selector"}>
                        <HStack>

                        </HStack>
                    </Page>
                </HStack>
            </Provider>
        </ChakraProvider>
    );
}
}
const appContainer = document.querySelector("#app-container");
ReactDOM.render(<App />,appContainer);
