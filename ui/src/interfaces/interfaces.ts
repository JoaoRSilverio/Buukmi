
export interface IUserProfile{
  username: string;
  firstName: string;
  lastName: string;
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
