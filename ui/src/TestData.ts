import {
    IServicePreConditionValue,
    IService,
    IServiceFeature,
    IServiceFeatureOption, IServicePreConditionRequirement,
    IServicePreConditionType, IServiceTechnicalRequest, IServiceTemplate
} from "./interfaces/interfaces";
import {Currencies, Money} from "ts-money";


const pcHairLengthValues: IServicePreConditionValue[] = [
    {icon:undefined,id:"00",description:"Long Hair",title:"Long"},
    {icon:undefined,id:"01",description:"Short Hair",title:"Short"},
    {icon: undefined,id:"02",description:"Medium Hair", title:"Medium"},
    {icon:undefined, id:"03",description:"Bald Head", title:"Bald"}
]

export const pcHairLenght:IServicePreConditionType = {
    title: "Hair Length",
    description:"Length of the client hair",
    icon:"somehting",
    id:"00",
    availableValues:pcHairLengthValues
}

export const hairCutPreConditionRequirement: IServicePreConditionRequirement = {
    acceptedValues:pcHairLengthValues,
    defaultValue:pcHairLengthValues[0],
    id:"00",
    preCondition:pcHairLenght
}

export const eyebrowFeatureOptions: IServiceFeatureOption [] = [
    {
        id:"00",
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
        icon:undefined,
        description:"clear the space between eyebrows",
        title:"Unibrow Prevention"
    },
    {
        id:"01",
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
        icon:undefined,
        description: "make the ending of the brow pointy",
        title:"Sharpen eyebrow"
    },
    {
        id:"02",
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
        icon:undefined,
        description: "make the ending of the brow square",
        title:"Square eyebrow"
    }
]

const eyebrowFeatureOptionsOptional: IServiceFeatureOption[] = [
    {
        id:"00",
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
        title:"Nose Hair",
        description:"Also remove outside nose hair",
        icon:undefined
    }
]


const frontHairlineFeatureOptions: IServiceFeatureOption[] = [
    {
        id:"00",
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
        icon: undefined,
        description:"make a straight horizontal line between the 2 edges",
        title:"Straight"
    },
    {
        id:"01",
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
        icon: undefined,
        description: "make a curved horizontal line between the 2 edges",
        title:"Curved"
    }
]

export const haircutFeatures:IServiceFeature[] = [
    {
        title:"Eyebrows",
        description:"Contouring of the eyebrows",
        featureRequests:[],
        icon:undefined,
        id:"00",
        includedFeatureOptions:[
            [eyebrowFeatureOptions[1],eyebrowFeatureOptions[2]],[eyebrowFeatureOptions[0]]],
        optionalFeatureOptions:[eyebrowFeatureOptionsOptional],
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
    },
    {
        title:"Front Hairline",
        description:"The hairline in the front of the head",
        featureRequests:[],
        icon:undefined,
        id:"01",
        includedFeatureOptions:[frontHairlineFeatureOptions],
        optionalFeatureOptions:[],
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
    }
]
const scissorOnlyRequest:IServiceTechnicalRequest = {
    durationInS:60,
    discountRateInPercentile:0,
    basePrice:new Money(10,Currencies.EUR),
    title:"Scissor Only",
    description:"Use only scissor",
    icon:undefined,
    id:"00"
}
const noConditioner:IServiceTechnicalRequest = {
    id:"01",
    durationInS:0,
    basePrice: new Money(0, Currencies.EUR),
    title:"No Conditioner",
    description:"dont use conditioner",
    icon:undefined,
    discountRateInPercentile:0
}

const HaircutTemplate: IServiceTemplate = {
    id:"00",
    title:"HairCut",
    description:"",
    icon:undefined,
    includedFeatures:[[haircutFeatures[0]],[haircutFeatures[1]]],
    optionalFeatures:[],
    possibleRequests:[scissorOnlyRequest]

}

const WashingTemplate: IServiceTemplate = {
    id:"01",
    title:"Washing",
    description:"",
    icon:undefined,
    includedFeatures:[],
    optionalFeatures:[],
    possibleRequests:[noConditioner]
}
export const TEMPLATES = [HaircutTemplate,WashingTemplate];
const serviceHairCutLevel1:IService = {
    id:"00",
    serviceTemplates:[HaircutTemplate],
    title:"General Haircut",
    description:"A standard haircut",
    icon:undefined,
    includedFeatures:[[haircutFeatures[0]],[haircutFeatures[1]]],
    optionalFeatures:[],
    possibleRequests:[scissorOnlyRequest],
    preConditions: [hairCutPreConditionRequirement],
    durationInS:1800,
    discountRateInPercentile:0,
    basePrice:new Money(10,Currencies.EUR),
}