import TSMoney, {Currencies, Money} from "ts-money"

export interface IUserProfile{
  username: string;
  firstName: string;
  lastName: string;
}

export interface UIOption {
  title: string;
  description: string;
  icon: string;
}
export interface TemporalEntity {
  durationInS: number;
}


// for EuroZone this is enough
export interface Priceable {
  basePrice: TSMoney.Money;
  discountRateInPercentile: number,
}
export interface IServicePreConditionValue extends UIOption{
  id: string;
}

export interface IServicePreConditionType extends UIOption{
  id: string;
  availableValues: IServicePreConditionValue[];
}

export interface IServicePreConditionRequirement {
  id: string;
  preCondition: IServicePreConditionType;
  acceptedValues: IServicePreConditionValue[];
  defaultValue: IServicePreConditionValue;
}

export interface IServiceTechnicalRequest extends UIOption, TemporalEntity,Priceable{
  id: string;
}

export interface IServiceFeatureOption extends UIOption,TemporalEntity,Priceable{

}

export interface IServiceFeature extends  UIOption,TemporalEntity,Priceable{
  id: string;
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

export interface IService extends UIOption,TemporalEntity,Priceable{
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
