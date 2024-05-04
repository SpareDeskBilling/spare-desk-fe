import React, { FC, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import { TextField } from 'components';
import { DownArrowBlack } from 'assets/icons';
import { OptionsLOVType } from 'types/generalTypes';
import { AutoCompleteProps } from './types';

const AutocompleteDropdown: FC<AutoCompleteProps> = props => {
  const {
    name,
    placeholder,
    control,
    options,
    errors,
    selectedItem = null,
    onChangeHandler = () => null,
    onInputChange = () => null,
    isDisabled = false,
    dataTestId = 'AutoComplete'
  } = props;

  const [selectedValue, setSelectedValue] =
    useState<OptionsLOVType>(selectedItem);

  useEffect(() => {
    setSelectedValue(selectedItem);
  }, [selectedItem]);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <Autocomplete
            sx={{
              width: '100%',
              '& .MuiAutocomplete-endAdornment': {
                top: 'calc(50%)',
                marginRight: '16px'
              },
              '& .MuiOutlinedInput-root': {
                padding: '8px'
              }
            }}
            options={options}
            autoHighlight={true}
            autoComplete={false}
            onChange={(event, value: OptionsLOVType) => {
              setSelectedValue(value);
              onChange(value?.id);
              onChangeHandler(value);
            }}
            onInputChange={(e,val)=> onInputChange(val)}
            popupIcon={<DownArrowBlack />}
            value={selectedValue}
            getOptionLabel={(option: OptionsLOVType) => {
              return option.name;
            }}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            renderOption={(renderingprops, option) => (
              <Box
                data-testid={option.name}
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...renderingprops}>
                {option.name}
              </Box>
            )}
            renderInput={params => (
              <TextField
                {...params}
                label={placeholder}
                name={name}
                testid={dataTestId}
                errors={errors}
              />
            )}
            disabled={isDisabled}
          />
        )}
      />
      {!isEmpty(errors) && errors[name]?.message && (
        <p className="mt-[4px] text-xs text-red-500">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default AutocompleteDropdown;
