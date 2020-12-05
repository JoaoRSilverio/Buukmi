import TSMoney, {Currencies, Money} from "ts-money"

export interface IUserProfile{
  username: string;
  firstName: string;
  lastName: string;
}
export interface IEntity{
  id: string;
}
export interface UIOption {
  title: string;
  description: string;
  icon: string;
}

export interface UIEntity extends IEntity,UIOption {};
export interface TemporalEntity {
  durationInS: number;
}


// for EuroZone this is enough
export interface Priceable {
  basePrice: TSMoney.Money;
  discountRateInPercentile: number,
}
export interface IServicePreConditionValue extends UIEntity{

}

export interface IServicePreConditionType extends UIEntity{
  availableValues: IServicePreConditionValue[];
}

export interface IServicePreConditionRequirement extends IEntity{
  preCondition: IServicePreConditionType;
  acceptedValues: IServicePreConditionValue[];
  defaultValue: IServicePreConditionValue;
}

export interface IServiceTechnicalRequest extends UIEntity, TemporalEntity,Priceable{
}

export interface IServiceFeatureOption extends UIEntity,TemporalEntity,Priceable{

}

export interface IServiceFeature extends  UIEntity,TemporalEntity,Priceable{
  icon: string;
  title: string;
  description: string;
  includedFeatureOptions: IServiceFeatureOption[][];
  optionalFeatureOptions: IServiceFeatureOption[][];
  featureRequests: IServiceTechnicalRequest[]
}
export interface IServiceFeatureSpec {
  selectedFeature:IServiceFeature,
  selectedOptions: IServiceFeatureOption[],
  selectedRequests: IServiceTechnicalRequest[]
}
// This represents a selection
export interface IServiceSpec {
  service: IService,
  existingPreConditions:IServicePreConditionValue[],
  serviceRequests:IServiceTechnicalRequest[],
  serviceSelectedFeatures:IServiceFeatureSpec[],
}
export interface IServiceTemplate extends UIEntity {
  possibleRequests: IServiceTechnicalRequest[];
  includedFeatures: IServiceFeature[][];// when a feature excludes the other they go in the same array
  optionalFeatures: IServiceFeature[][];
}
export interface IService extends UIEntity,TemporalEntity,Priceable{
  serviceTemplates:IServiceTemplate[];
  preConditions: IServicePreConditionRequirement[];
  possibleRequests: IServiceTechnicalRequest[];
  includedFeatures: IServiceFeature[][];// when a feature excludes the other they go in the same array
  optionalFeatures: IServiceFeature[][];
}
export class ServiceUtils {
  static getPriceRange(service:IService):{from:TSMoney.Money, to:TSMoney.Money}{
    const price = new Money(0,Currencies.EUR);
    service.possibleRequests.forEach(techRequest => price.add(techRequest.basePrice));
    service.includedFeatures.forEach(incFeature => price.add(incFeature[0].basePrice));
    service.optionalFeatures.forEach(optFeature => price.add(optFeature[0].basePrice));
    return {
      from:service.basePrice,
      to:price}


  }
}

export enum DATE_FORMATS {
  WEEKDAY_DMONTH_MONTH = 'eeee, dd MMMM',
  WEEKDAY_MONTH_TIME = 'MMM dd HH:mm',
  HOUR_MINUTE_SECOND = 'HH:mm:ss',
  HOUR_MINUTE = 'HH:mm',
  MONTH_SHORTDAY = 'MMMM dd',
  LONGDAY_MONTH_YEAR = 'eeee, d MMMM yyyy',
  SHORTDAY_MONTH_YEAR = 'eee, d MMMM yyyy',
  SHORTDAY = 'dd / MMM / yy',
}

export interface INotification {
  notificationId: string;
  duration: number;
  route: any;
  routeData: any;
  color: string;
  isDismissable: string;
  isSwipable: string;
  icon: string;
}

export interface IAppError {
  reason: string;
  timestamp: string;
  uiTitle: string;
  uiDescription: string;
  action?: ErrorReaction;
}
interface ErrorReaction {
  reaction: ()=> void;
  uiLabel: string;
}
