import React from "react";
import {IServicePreConditionRequirement} from "../../interfaces/interfaces";
import {
    HStack,
    Text,
    Badge,
    VStack,
    Heading,
    IconButton
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";

const Requirement:React.FC<IServicePreConditionRequirement> = (props) => {
    const {acceptedValues,preCondition} = props;
    return (
        <VStack alignItems={"start"}>
            <Heading size={"sm"} minW={98}>{preCondition.title}</Heading>
            <HStack>
                {   acceptedValues.length === preCondition.availableValues.length ?
                    <Badge fontSize={"0.6em"} colorScheme={"green"} >{"ALL"}</Badge>
                    :
                    acceptedValues.map( acceptedValue => <Badge fontSize={"0.6em"} colorScheme={"green"} key={acceptedValue.id}>{acceptedValue.title}</Badge> )}
            </HStack>
        </VStack>
    )
}

export default Requirement;
