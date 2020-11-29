import {IServicePreConditionType, IServicePreConditionValue} from "../../interfaces/interfaces";
import { Box, HStack, VStack, Heading, Text, Divider,List,IconButton} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import React from "react";
const PreConditionValue:React.FC<IServicePreConditionValue> = (props)=>{
    return (
        <VStack alignItems={"start"} spacing={0}>
            <Heading  lineHeight={1} size={"sm"} >{props.title}</Heading>
            <Divider/>
            <Text fontSize={"xs"}>{props.description}</Text>
        </VStack>
    )
}
const PreCondition:React.FC<IServicePreConditionType> = (props)=>{
    const {title,description,availableValues} = props;
    return(
        <VStack alignItems={"start"} spacing={0} p={2}  style={{border:"1px solid black",borderRadius:"4px"}}>
            <Heading lineHeight={1} textAlign={"left"} size={"sm"} >
                {title}
            </Heading>
            <Text fontSize={"xs"}>{description}</Text>
            <Divider />
            <List py={4} spacing={2}>
                {availableValues.map( value => <PreConditionValue key={value.id} {...value} /> )}
            </List>
            <IconButton  size={"xs"} alignSelf={"center"} aria-label="Search database" icon={<AddIcon h={"8px"} w={"8px"} />} />
        </VStack>
    )
}

export default PreCondition;

