import baseApi from "services/api";
import { AddSparePartsPayload, AddSparePartsResponse, EditSparePartsPayload, EditSparePartsResponse, PartDetails } from "./types";
import { GenericApiResponse } from "types/generalTypes";

export const mockData: PartDetails[] = [{
  sku: "001",
  name: "Bolt",
  qty: '25',
  dealerPrice: '25.98',
  mrp: '40',
  location: "B12",
  model: "TVS200,160,180"
},
{
  sku: "002",
  name: "Screw",
  qty: '254',
  dealerPrice: '15.08',
  mrp: '20',
  location: "S2",
  model: "Bajaj200,160,180 skjdhf skfjh sjkfdh shfgds kfsd sdfhk sdfg jsfgdshf js sjhf fjhdsf jsdfhsdf jshf djsfhdsjs hgsf j"
},
{
  sku: "003",
  name: "Oil Filer",
  qty: '5',
  dealerPrice: '25.98',
  mrp: '80',
  location: "",
  model: ""
}]

const DashboardBaseApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getSparePartsList: builder.query<
      PartDetails[],
      void
    >({
      query: () => "https://restcountries.com/v3.1/all",
      transformResponse: (response: GenericApiResponse<PartDetails[]>) =>
        mockData || response?.result,
      providesTags: ['GetSpareList']
    }),
    addSpareParts: builder.mutation<
      AddSparePartsResponse,
      AddSparePartsPayload
    >({
      query: ({ payload }) => ({
        url: '/add-parts',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['GetSpareList'],
      extraOptions: {
        showNotifier: true,
        failure: "Something went wrong, unable to add",
        success: "Item added successfully"
      }
    }),
    editSpareParts: builder.mutation<
      EditSparePartsResponse,
      EditSparePartsPayload
    >({
      query: ({ payload, id }) => ({
        url: `/edit-parts/${id}`,
        method: 'PUT',
        body: payload
      }),
      invalidatesTags: ['GetSpareList'],
      extraOptions: {
        showNotifier: true,
        failure: "Something went wrong, unable to add",
        success: "Item added successfully"
      }
    }),
  })
});

export const {
  useGetSparePartsListQuery,
  useAddSparePartsMutation,
  useEditSparePartsMutation
} = DashboardBaseApi;