import { mockData } from "pages/dashboard/api";
import { PartDetails } from "pages/dashboard/types";
import baseApi from "services/api";
import { GenericApiResponse } from "types/generalTypes";

const BillingBaseApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSparePartsListByName: builder.query<
      PartDetails[],
      {search: string}
    >({
      query: ({search}) => `https://restcountries.com/v3.1/name/${search}`,
      transformResponse: (response: GenericApiResponse<PartDetails[]>) =>
        mockData || response?.result,
      providesTags: ['GetSpareList']
    }),
  })
});

export const {
  useLazyGetSparePartsListByNameQuery
} = BillingBaseApi;