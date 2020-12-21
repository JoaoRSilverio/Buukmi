import EntityEditor, {
    IEntityEditorProps,
    UIOptionEditor,
    useEditorEntity,
    useEditorUpdatedFlag,
    TemporalEntityEditor,
    PriceEditor, IEntityEditorForType, RequirementEditor
} from "./EntityEditor";
import {IService, IServicePreConditionRequirement, IServiceTemplate} from "../interfaces/interfaces";
import React from "react";
import {Currencies, Money} from "ts-money";
import Page from "./Page";
import {haircutFeatures, hairCutPreConditionRequirement, pcHairLenght, TEMPLATES} from "../TestData";
import EntityMultiSelector from "./selectors/EntityMultiSelector";
const createNewService = ():IService => {
    console.log("ran");
    return {
        serviceTemplates:[],
        id:"00",
        basePrice: new Money(0,Currencies.EUR),
        discountRateInPercentile:0,
        durationInS:0,
        icon:"",
        description:"",
        title:"",
        possibleRequests:[],
        preConditions:[hairCutPreConditionRequirement],
        optionalFeatures:[],
        includedFeatures:[[haircutFeatures[0]]]
    }
}


export  const ServiceEditor:React.FC<IEntityEditorForType<IService>> = (props) => {
    const [activeEntity,updateActiveEntity] = useEditorEntity<IService>();
    function updateTemplateSelection(selection:IServiceTemplate[]){
        updateActiveEntity({...activeEntity,serviceTemplates:selection})
    }
    return(
        <EntityEditor {...props}
                      onSaved={()=>props.onSaved(activeEntity)}
                      createNew={()=>updateActiveEntity(createNewService())} >
            <UIOptionEditor entity={activeEntity} onEntityUpdated={updateActiveEntity}/>
            <TemporalEntityEditor entity={activeEntity} onEntityUpdated={updateActiveEntity}/>
            <PriceEditor entity={activeEntity} onEntityUpdated={updateActiveEntity}/>
            <RequirementEditor
                onAddRequirement={()=>{}}
                entity={activeEntity}
                onEntityUpdated={updateActiveEntity} />
            { activeEntity && <EntityMultiSelector
                title={"Service Template"}
    entities={TEMPLATES}
    onSelectionChange={
        (updatedSelection)=> updateTemplateSelection(updatedSelection as IServiceTemplate[]) }
    selection={activeEntity.serviceTemplates} />}
        </EntityEditor>
    )
}

export default ServiceEditor;