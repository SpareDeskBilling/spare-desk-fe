export const API_ENDPOINT = 'https://api.qa-mania.kvsandbox.link/qa-hunt';

export enum IsLoggedInValues {
  IS_LOGGED_IN = 'isUserLoggedIn',
  LOGGED_IN = 'true',
  LOGGED_OUT = 'false'
}

export const ACCESS_TOKEN = 'accessToken';
export const USER_TYPE = 'userType';

export const API_RESPONSE_STATUS = {
  OK: 'ok',
  NOT_OK: 'nok'
};

export const JOB_NOTIFIER = 'JOB_NOTIFIER';

export enum NotifierTypes {
  LOADING = 'loadingState',
  LINK_ERROR = 'linkErrorState',
  DELETE = 'deleteState',
  SYNC_ERROR = 'syncErrorState',
  SUCCESS = 'successState',
  ERROR = 'errorState',
  JOB_QUEUE_LOADING = 'jobQueueLoadingState'
}