import React, {useEffect, useState} from "react";
import {
    IServicePreConditionRequirement,
    IServicePreConditionType,
    IServicePreConditionValue
} from "../interfaces/interfaces";
import {Badge, Divider,HStack,IconButton,Button,VStack} from "@chakra-ui/react";

export interface IRequirementValueSelectorProps {
    requirement: IServicePreConditionRequirement;
    condition: IServicePreConditionType;
    onAcceptedChange:(acceptedList:IServicePreConditionValue[]) => void;
}
const RequirementValueSelector:React.FC<IRequirementValueSelectorProps> = (props) => {
    const {onAcceptedChange} = props;
    const {availableValues} = props.condition;
    const {acceptedValues} = props.requirement;
    return (
        <VStack spacing={0}>
            <HStack>
            {props.requirement.acceptedValues.map(
                value =>
                    <IconButton
                        colorScheme={"transparent"}
                        key={value.id}
                        onClick={
                            ()=> onAcceptedChange(
                                [...acceptedValues.filter(v=> v.id !== value.id)])}
                        aria-label={value.title}
                        icon={<Badge colorScheme={"green"} fontSize={"0.7em"}>{value.title}</Badge>} />)}
            </HStack>
            <Divider/>
            <HStack>
            {availableValues.filter(
                av=> !props.requirement.acceptedValues.includes(av)).map(
                value =>
                    <IconButton
                        colorScheme={"transparent"}
                        key={value.id}
                        onClick={()=> onAcceptedChange([...acceptedValues,value])}
                        aria-label={value.title}
                        icon={<Badge fontSize={"0.6em"}>{value.title}</Badge>} />)}
            </HStack>
            </VStack>
    )
}

export default RequirementValueSelector;