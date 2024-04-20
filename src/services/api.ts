import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs
} from '@reduxjs/toolkit/dist/query/react';

import { showNotifier } from 'reducers/appReducer';
import { ERROR_CODE_MAPPER } from 'constants/errorCodeMapper';
import { NotifierTypes } from 'constants/common';
import { ExtraOptions, HandleNotifierLogics } from './type';
import store from 'store/store';

export const handleNotifier: HandleNotifierLogics = (
  result,
  extraOptions,
  errorCodeMapper
) => {
  if (result?.error && extraOptions?.showNotifier && extraOptions?.failure) {
    let notifierMessage = extraOptions.failure;
    const error: any = result.error;
    if (!extraOptions?.showCustomMessage && error?.data?.error) {
      const errorObj = error?.data?.error;
      // check for the message in the ERROR_CODE_MAPPER object
      if (errorObj.message && errorCodeMapper[errorObj.message]) {
        notifierMessage = errorCodeMapper[errorObj.message];
      } else if (errorObj.details?.length > 0) {
        // shows the default BE message if corresponding message for code is not available
        notifierMessage = errorObj.details?.join(',');
      }
    }
    store.dispatch(
      showNotifier({
        message: notifierMessage,
        type: extraOptions?.failureNotifierType || NotifierTypes.ERROR
      })
    );
  } else if (
    result &&
    !result.error &&
    extraOptions?.showNotifier &&
    extraOptions?.success
  ) {
    store.dispatch(
      showNotifier({
        message: extraOptions.success,
        type: extraOptions?.successNotifierType || NotifierTypes.SUCCESS
      })
    );
  }
};

const throwGenericError = error => {
  store.dispatch(
    showNotifier({
      message: "Somethinf went wrong",
      type: NotifierTypes.ERROR
    })
  );
  return error;
};

/* REST API*/
/* Transaction API*/
const baseQuery = fetchBaseQuery({
  baseUrl: 'spare-desk-be/',
  credentials: 'include'
});

const customFetchTransactionBaseQuery: BaseQueryFn<
  string | FetchArgs, // Args
  unknown, // Result
  unknown, // Error
  ExtraOptions, // DefinitionExtraOptions
  object // Meta
> = async (arg, api, extraOptions) => {
  try {
    const result = await baseQuery(arg, api, extraOptions);
    handleNotifier(result, extraOptions, ERROR_CODE_MAPPER);
    return result;
  } catch (error) {
    throwGenericError(error);
  }
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [
    'GetSpareList'
  ],
  baseQuery: customFetchTransactionBaseQuery,
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true
});

// /* Auth API */
// const authBaseQuery = fetchBaseQuery({
//   baseUrl: `${process.env.REACT_APP_AUTH_SVC_API_ENDPOINT}/${process.env.REACT_APP_AUTH_SVC_API_VERSION}/`,
//   credentials: 'include'
// });

// const customFetchAuthBaseQuery: BaseQueryFn<
//   string | FetchArgs, // Args
//   unknown, // Result
//   unknown, // Error
//   ExtraOptions, // DefinitionExtraOptions
//   object // Meta
// > = async (arg, api, extraOptions) => {
//   try {
//     const result = await authBaseQuery(arg, api, extraOptions);
//     handleNotifier(result, extraOptions, AUTH_SVC_ERROR_CODE_MAPPER);
//     return result;
//   } catch (error) {
//     throwGenericError(error);
//   }
// };

// export const authBaseApi = createApi({
//   reducerPath: 'authBaseApi',
//   baseQuery: customFetchAuthBaseQuery,
//   endpoints: () => ({}),
//   tagTypes: [
//     'GetUserDetails',
//     'GetClientDetails',
//     'GetProfessionalDetails',
//     'GetPendingInviteCount'
//   ]
// });

export default baseApi;
