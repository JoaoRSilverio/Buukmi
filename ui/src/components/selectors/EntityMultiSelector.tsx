import {IServiceTemplate, UIEntity} from "../../interfaces/interfaces";

import React, {useState} from "react";
import {MultiSelect, ItemRenderer, IItemRendererProps} from "@blueprintjs/select";
import {MenuItem} from "@blueprintjs/core";
import { Heading } from "@chakra-ui/react";

export interface EntitySelectorProps {
    title: string;
    entities:UIEntity[];
    onSelectionChange:(templates:UIEntity[])=> void;
    selection:UIEntity[];
}
function useTemplates(entities:UIEntity[] = []):[UIEntity[],(updatedTemplates:UIEntity[])=> void]{
    const [selectedEntities,setEntity] = useState(entities);

    return [selectedEntities,setEntity];
}

const EntityMultiSelector:React.FC<EntitySelectorProps> = (props) => {
    return(
        <>
            <Heading size={"sm"}>{props.title}</Heading>
        <TemplateMultiSelect
            selectedItems={props.selection}
            tagRenderer={renderTag}
            items={props.entities}
            onItemSelect={
                (entity:UIEntity) => handleEntitySelect(entity,props.selection,props.onSelectionChange)}
            itemRenderer={
                (entity:UIEntity,itemRendererProps:IItemRendererProps) =>
                renderEntity(entity,props.selection,itemRendererProps)} />
                </>
        )
}
const handleEntitySelect = (
    entity: UIEntity,selection:UIEntity[],
    onSelectionChangedCallback:(entities:UIEntity[])=> void) => {
    if(selection.includes(entity)){
        onSelectionChangedCallback(
            [...selection.filter(ent => ent.id !== entity.id)]);
    } else {
        onSelectionChangedCallback(
            [...selection, entity]);
    }
}
const TemplateMultiSelect = MultiSelect.ofType<UIEntity>();
const renderTag = (template:UIEntity) => template.title;
const renderEntity:any = (entity:UIEntity, selection:UIEntity[],props:IItemRendererProps) => {
    const {modifiers, handleClick} = props;
    if(!modifiers.matchesPredicate) return null;
    return(
        <MenuItem
         active={modifiers.active}
         icon={selection.includes(entity) ? "tick" : "blank"}
         key={entity.id}
         label={entity.description}
         onClick={handleClick}
         text={entity.title}
         shouldDismissPopover={false}
        />
    )
}

export default EntityMultiSelector;