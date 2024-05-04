/* eslint-disable no-unused-vars */
import { Control } from 'react-hook-form';

import { OptionsLOVType } from 'types/generalTypes';

export type AutoCompleteProps = {
  name: string;
  placeholder: string;
  control: Control<any, any>;
  options: OptionsLOVType[];
  errors?: object;
  selectedItem?: OptionsLOVType;
  onChangeHandler?: (selectedValue: OptionsLOVType) => void;
  onInputChange?: (value: string) => void;
  isDisabled?: boolean;
  dataTestId?: string;
};
