import { Box, HStack, VStack,Heading,Text,Button,Divider } from "@chakra-ui/react";
import React from "react";
import {IServiceFeatureOption, IServiceFeatureSpec} from "../../interfaces/interfaces";
import UIOptionSelector from "../selectors/UIOptionSelector";
export interface IServiceFeatureSpecProps extends IServiceFeatureSpec {
    onOptionsChange:(updatedFeature:IServiceFeatureSpec)=> void;
}
const ServiceFeatureSpec:React.FC<IServiceFeatureSpecProps> = (props) => {
    const {selectedFeature,selectedOptions, onOptionsChange,selectedRequests} = props;
    const {title,description,basePrice } = selectedFeature;
    return (
        <VStack align={"start"} spacing={"16px"}>
        <HStack height={"60px"} align={"center"} w={"350px"}>
            <Box height={"50px"} width={"50px"} bgColor={"black"} />
            <VStack spacing={0} align={"start"} minW={75} w={"200px"} >
                <Heading size={"xs"}>{title}</Heading>
                <Text fontSize={"0.8em"}>{description}</Text>
            </VStack>
            <Divider orientation={"vertical"}/>
            <Heading w={"100px"} size={"md"}>{basePrice.amount + " " + basePrice.currency }</Heading>
        </HStack>
        <UIOptionSelector
            selectedOptions={selectedOptions}
            availableOptions={selectedFeature.includedFeatureOptions}
            onSelectionChange={
                (updatedOption)=>
                    onOptionsChange({
                        selectedFeature,
                        selectedRequests,
                        selectedOptions:updatedOption as IServiceFeatureOption[]})}/>
        </VStack>
    )
}

export default ServiceFeatureSpec;