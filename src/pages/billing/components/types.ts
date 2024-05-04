import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { BaseQueryFn, FetchArgs, QueryDefinition } from "@reduxjs/toolkit/query";
import { PartDetails } from "pages/dashboard/types";
import { ExtraOptions } from "services/type";

export type FormFieldValues = {
  name: string;
  mob: string;
  vehicle: string;
  vehicleNumber: string;
  partInfo: {
    partId: string;
    partName: string;
    qty: string;
    amount: string;
    availableQty: string;
    mrp: string;
  }[];
  labour: string;
}

export type BillFormProps = {
  isGenerating: boolean;
  spareData: PartDetails[];
  getSparePartsListByName: LazyQueryTrigger<QueryDefinition<{
    search: string;
  }, BaseQueryFn<string | FetchArgs, unknown, unknown, ExtraOptions, object>, "GetSpareList", PartDetails[], "baseApi">>
}