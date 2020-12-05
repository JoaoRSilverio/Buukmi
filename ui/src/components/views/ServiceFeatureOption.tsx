import {Heading, HStack, VStack, Text, Image, Box, Divider, Button} from "@chakra-ui/react";
import React from "react";
import {IServiceFeatureOption} from "../../interfaces/interfaces";

export const ServiceFeatureOption:React.FC<IServiceFeatureOption> =(props) => {
    const { icon, durationInS,discountRateInPercentile,basePrice,description,title } = props;
    return(
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
        </VStack>
    )
}