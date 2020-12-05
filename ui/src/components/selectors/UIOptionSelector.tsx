import {Box, Button, Heading, HStack, Image, VStack,Tooltip, Collapse} from "@chakra-ui/react";
import React, {useState} from "react";
import {IEntity, UIEntity, UIOption} from "../../interfaces/interfaces";

interface IUIOptionElementProps extends UIEntity {
    onClick:()=> void;
    isSelected: boolean;
}

const TempIcon = (props:{title:string}) => {
    return (
        <Box
            textAlign={"center"}
            lineHeight={"20px"}
            fontSize={"0.8em"}
            borderRadius={5}
            height={"20px"}
            width={"20px"}
            color={"white"}
            bgColor={"black"}>{props.title.substr(0,2)}</Box>)
}

const UIOptionElement:React.FC<IUIOptionElementProps> = (props)=>{
    const {title, icon,description ,isSelected} = props;
    return (

        <Button colorScheme={ isSelected ? "green" :"#f1f1f1"}  justify={"start"}  height={30} onClick={()=> props.onClick() }>
            <Tooltip label={description} >
        <HStack>
            <TempIcon title={title} />
            <Heading color={isSelected ? "white" : "black"} size={"xs"}>{title}</Heading>
        </HStack>
            </Tooltip>
        </Button>

    )
}

export interface UIOptionSelectorProps {
    selectedOptions:UIEntity[];
    availableOptions:UIEntity[][];
    onSelectionChange: (newSelection:UIEntity[]) => void;
}
const UIOptionSelector:React.FC<UIOptionSelectorProps> = (props)=> {
    const {selectedOptions,availableOptions} = props;
    const [isExpanded,setExpanded] = useState(false);
    function addToSelection(option:UIEntity, incompatibleWith?: UIEntity[]){
        if(selectedOptions.length){
            if(selectedOptions.includes(option)) {
                props.onSelectionChange([...selectedOptions.filter(s => s.id !== option.id)]);
                return;
            }
            if(incompatibleWith){
             const newSelection = [...selectedOptions].filter( s => !incompatibleWith.includes(s));
             newSelection.push(option);
             props.onSelectionChange(newSelection);
            } else {
                props.onSelectionChange([...selectedOptions, option]);
            }
        }
        else{
            props.onSelectionChange([option]);
        }
    }
    function renderSelection(actionTitle:string,action:()=>void){
        return (
            <HStack bgColor={"#f1f1f1"}  justify={"start"}  height={30} width={"350px"}>
                <HStack pl={"16px"} justify={"start"} w={"260px"}>
                    {selectedOptions.length && selectedOptions.map(sO =>  <TempIcon key={sO.title} title={sO.title} />)}
                </HStack>
                <Button onClick={action} bgColor={"transparent"} size={"sm"} >{actionTitle}</Button>
            </HStack>
        )
    }
    return (
        <VStack mt={16} spacing={8} alignItems={"start"}>
            {renderSelection(isExpanded ? "save" : "edit",()=> setExpanded(!isExpanded))}
            <Collapse style={{overflow:"visible"}} in={isExpanded} animateOpacity>
                <VStack spacing={8} alignItems={"start"}>
            {availableOptions.map( optionSet =>
                    <HStack>
                    {
                        optionSet.map(
                            option =>
                                <UIOptionElement
                                    isSelected={selectedOptions.includes(option)}
                                    {...option}
                                    onClick={
                                        ()=>addToSelection(
                                            option,
                                            optionSet.length > 1 ? optionSet : undefined)}
                                />)}
                </HStack>)}
                </VStack>
            </Collapse>
        </VStack>
    )
}

export default UIOptionSelector;