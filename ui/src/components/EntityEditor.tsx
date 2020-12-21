import React, { useState,useEffect} from "react";
import {
    Heading,
    Input,
    InputGroup,
    VStack,
    Button,
    Box,
    Divider, IconButton, HStack,
    SlideFade,
    FormControl,
    FormLabel
} from "@chakra-ui/react";
import {AddIcon, SmallAddIcon} from "@chakra-ui/icons";
import {
    IService,
    IServicePreConditionRequirement,
    IServicePreConditionValue,
    Priceable,
    TemporalEntity,
    UIOption
} from "../interfaces/interfaces";
import {Currencies, Money} from "ts-money";
import Requirement from "./views/Requirement";
import {HamburgerIcon} from "@chakra-ui/icons";
import RequirementValueSelector from "./RequirementValueSelector";

export interface IEntityEditorProps{
    editorTitle: string;
    createNew:()=> any;
    onSaved:()=> void;
    children: React.ReactElement<ISubEditor<any>> | React.ReactElement<ISubEditor<any>>[];
}
export interface IEntityEditorForType<T>{
    onSaved:(entity:T)=> void;
    editorTitle: string;
    entity?: T;
}

export function useEditorEntity<T>():[T,(entity:T)=>void] {
    const [activeEntity,updateActiveEntity] = useState(null);
    return [activeEntity,updateActiveEntity];
}
export function useEditorUpdatedFlag():[boolean,(entity:boolean)=>void]{
    const [isUpdated, setIsUpdated] = useState(false);
    return [isUpdated,setIsUpdated];
}



interface ISubEditor<T> {
    onEntityUpdated:(entity: T)=> void;
}
interface IUIOptionEditorProps extends ISubEditor<UIOption>{
    entity: UIOption;
}
interface ITemporalEntityEditorProps extends ISubEditor<TemporalEntity>{
    entity: TemporalEntity;
}
interface PriceEditorProps extends ISubEditor<Priceable>{
    entity:Priceable;
}
interface IRequirementEditorProps extends ISubEditor<IService>{
    entity:IService;
    onAddRequirement:()=> void;
}

/// Sub Editors
export const UIOptionEditor:React.FC<IUIOptionEditorProps> = (props) => {
    if(!props.entity) return null;
    const {title,description,icon} = props.entity;
    return(

        <>
            <FormControl>
                <FormLabel fontSize={"0.6em"}>{"TITLE"}</FormLabel>
                <Input
                    value={title}
                    onChange={(event)=>
                        props.onEntityUpdated({...props.entity,title:event.target.value})}
                    type={"text"}
                    placeholder={"Title"} />
            </FormControl>
            <FormControl>
                <FormLabel fontSize={"0.6em"} >{"DESCRIPTION"}</FormLabel>
                <Input
                    value={description}
                    onChange={(event)=>
                        props.onEntityUpdated({...props.entity,description:event.target.value})}
                    type={"text"}
                    placeholder={"Description"} />
            </FormControl>
            <FormControl>
                <FormLabel fontSize={"0.6em"}>{"ICON URL"}</FormLabel>
                <Input
                    value={icon}
                    onChange={(event)=>
                        props.onEntityUpdated({...props.entity,icon:event.target.value})}
                    type={"text"}
                    placeholder={"Icon"} />
            </FormControl>
        </>
    )
}
export const TemporalEntityEditor:React.FC<ITemporalEntityEditorProps> =(props)=>{
    if(!props.entity) return null;
    const {durationInS} = props.entity;
    return(<>
        <FormControl>
            <FormLabel fontSize={"0.6em"}>{"DURATION IN SECONDS"}</FormLabel>
            <Input
                value={durationInS}
                onChange={(event)=>
                    props.onEntityUpdated({...props.entity, durationInS:parseInt(event.target.value)})}
                type={"number"}
                placeholder={"Duration In Seconds"} />
        </FormControl>
    </>)
}
export const PriceEditor:React.FC<PriceEditorProps> = (props) => {
    if(!props.entity) return null;
    const {discountRateInPercentile,basePrice} = props.entity
    return (<>
        <FormControl>
            <FormLabel fontSize={"0.6em"}>{"BASE PRICE"}</FormLabel>
            <Input
                value={basePrice.amount}
                onChange={(event)=>
                    props.onEntityUpdated({...props.entity, basePrice:new Money(parseInt(event.target.value),Currencies.EUR)})}
                type={"number"}
                placeholder={"Base Price"} />
        </FormControl>
    </>)
}
export const RequirementEditor: React.FC<IRequirementEditorProps>=(props)=>{
    if(!props.entity) return null;
    const {onAddRequirement} = props;
    const requirements = props.entity.preConditions;
    const[activeReqId,setActiveReq] = useState(null);
    const editor = ()=> {
        const active = props.entity.preConditions.find(r => r.id === activeReqId)
        return (
        <SlideFade in={true} offsetX={100}>
        <RequirementValueSelector
            requirement={active}
            condition={active.preCondition}
            onAcceptedChange={acceptedValues => saveReqChanges({...active,acceptedValues}) }
            />
        </SlideFade>
        )
    }
    const conditionConfigurator = (req:IServicePreConditionRequirement) => {
        return (
            <HStack minH={120} key={req.id} spacing={5}>
                 <Requirement {...req} acceptedValues={activeReqId ? [] : req.acceptedValues}/>
                <IconButton
                    colorScheme={activeReqId ? "blue" : "gray" }
                    size={"xs"}
                    onClick={()=> activeReqId ? setActiveReq(null) : setActiveReq(req.id)}
                    aria-label={"settings"}
                    icon={<HamburgerIcon h={3} w={3} />} />
                {activeReqId &&
                    editor()
                }
            </HStack>
        )
    }
    const saveReqChanges =(req:IServicePreConditionRequirement) => {
        const newRequirements = [...requirements];
        newRequirements.splice(requirements.findIndex(r => r.id === req.id ),1);
        console.log(req.acceptedValues);
        newRequirements.push(req);
        props.onEntityUpdated({...props.entity, preConditions:newRequirements});
    }


    return (
        <VStack>
            <Divider />
            {requirements.length && requirements.map(req => conditionConfigurator(req))}
            <Divider />
            <IconButton aria-label={"add requirement"} icon={<SmallAddIcon />} onClick={()=> onAddRequirement()} />
        </VStack>
    );
}
/// Main Editor
const EntityEditor:React.FC<IEntityEditorProps> = (props) => {
    const [isUpdated,setIsUpdated] = useEditorUpdatedFlag();
    return (
        <VStack p={8} style={{border:"1px solid grey",borderRadius:"4px"}} justify={"space-between"} alignItems={"start"} minH={300} minW={670}>
           <HStack>
               <Heading>{props.editorTitle}</Heading>
            <IconButton
                aria-label={"create new"}
                icon={<AddIcon />}
                onClick={()=>{
                    props.createNew();
                    setIsUpdated(true);
                }} />
           </HStack>
            {props.children}
            <Button justifySelf={"bottom"} alignSelf={"center"} mTop={50} onClick={()=> props.onSaved()} >Save</Button>
        </VStack>
    )
}

export default EntityEditor;


