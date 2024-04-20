import { FormEventHandler } from "react";
import { Control, UseFormGetValues, UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { PartDetails } from "../types";

export type FormFieldValues = {
  sku: string;
  name: string;
  qty: string;
  dealerPrice: string;
  mrp: string;
  location: string;
  model: string;
};

export type SparePartsFormProps = {
  control: Control<FormFieldValues, any>;
  submitHandler: () => FormEventHandler<HTMLFormElement>;
  handleCancel: () => void;
  errors: object;
  watch: UseFormWatch<FormFieldValues>;
  getValues: UseFormGetValues<FormFieldValues>;
  setValue: UseFormSetValue<FormFieldValues>;
  // transactionSourceOptions: SourceOptionListType[];
  isEdit?: boolean;
  // isManuallyAdded?: boolean;
  isUpdatingDetails: boolean;
  // coinOptions: OptionsLOVType[];
  reset: UseFormReset<FormFieldValues>;
  partDetails?: PartDetails;
};

export type DefaultValue = {
  name:
  | 'name'
  | 'sku'
  | 'qty'
  | 'dealerPrice'
  | 'mrp'
  | 'location'
  | 'model';
  value: string;
};