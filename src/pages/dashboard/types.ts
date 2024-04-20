export type PartDetails = {
  sku: string;
  name: string;
  qty: string;
  dealerPrice: string;
  mrp: string;
  location: string;
  model: string;
}

export type AddSparePartsPayload = {
  payload: {
    sku: string;
    name: string;
    qty: string;
    dealerPrice: string;
    mrp: string;
    location: string;
    model: string;
  }
}

export type AddSparePartsResponse = {
  status: string;
  result?: string;
  error?: {
    code?: number;
    details?: string[];
  };
};

export type EditSparePartsPayload = {
  payload: {
    sku: string;
    name: string;
    qty: string;
    dealerPrice: string;
    mrp: string;
    location: string;
    model: string;
  },
  id: string;
}

export type EditSparePartsResponse = {
  status: string;
  result?: string;
  error?: {
    code?: number;
    details?: string[];
  };
};