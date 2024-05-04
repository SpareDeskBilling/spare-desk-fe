
export type GenericApiResponse<Result> = {
  result?: Result;
  error?: ErrorObject;
  status: string;
};

export type ErrorObject = {
  code: number;
  message: string;
  details: string[];
};

export type OptionsLOVType = {
  id: string;
  name: string;
};