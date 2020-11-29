import EntityEditor, {
    IEntityEditorProps,
    UIOptionEditor,
    useEditorEntity,
    useEditorUpdatedFlag,
    TemporalEntityEditor,
    PriceEditor, IEntityEditorForType, RequirementEditor
} from "./EntityEditor";
import {IService, IServicePreConditionRequirement} from "../interfaces/interfaces";
import React from "react";
import {Currencies, Money} from "ts-money";
import Page from "./Page";
import {hairCutPreConditionRequirement, pcHairLenght} from "../TestData";
const createNewService = ():IService => {
    console.log("ran");
    return {
        basePrice: new Money(0,Currencies.EUR),
        discountRateInPercentile:0,
        durationInS:0,
        icon:"",
        description:"",
        title:"",
        possibleRequests:[],
        preConditions:[hairCutPreConditionRequirement],
        optionalFeatures:[],
        includedFeatures:[]
    }
}


export  const ServiceEditor:React.FC<IEntityEditorForType<IService>> = (props) => {
    const [activeEntity,updateActiveEntity] = useEditorEntity();
    return(
<Page title={"Editors Page"}>
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
        </EntityEditor>
</Page>
    )
}

export default ServiceEditor;