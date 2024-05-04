export type FormFieldValues = {
  name: string;
  mob: string;
  vehicle: string;
  vehicleNumber: string;
  partInfo: {
    partName: string;
    qty: string;
    amount: string;
  }[];
  labour: string;
}

export type BillFormProps = {
  isGenerating: boolean;
}