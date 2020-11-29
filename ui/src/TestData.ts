import {
    IServicePreConditionValue,
    IService,
    IServiceFeature,
    IServiceFeatureOption, IServicePreConditionRequirement,
    IServicePreConditionType, IServiceTechnicalRequest
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

const eyebrowFeatureOptions: IServiceFeatureOption [] = [
    {
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
        icon:undefined,
        description:"clear the space between eyebrows",
        title:"Unibrow Prevention"
    },
    {
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
        icon:undefined,
        description: "make the ending of the brow pointy",
        title:"Sharpen eyebrow"
    },
    {
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
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
        icon: undefined,
        description:"make a straight horizontal line between the 2 edges",
        title:"Straight"
    },
    {
        durationInS:60,
        discountRateInPercentile:0,
        basePrice:new Money(10,Currencies.EUR),
        icon: undefined,
        description: "make a curved horizontal line between the 2 edges",
        title:"Curved"
    }
]

const haircutFeatures:IServiceFeature[] = [
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

const serviceHairCutLevel1:IService = {
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